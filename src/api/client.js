/**
 * Centralized API Client Layer for Admire Softech
 */

const getBaseUrl = () => {
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
    if (envUrl && (envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))) {
      return envUrl.replace(/\/+$/, '');
    }
    return 'http://localhost:5000';
  }
  const rawBase = (
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    'https://api.admiresoftech.com'
  ).replace(/\/+$/, '');
  return rawBase;
};

const rawBase = getBaseUrl();
export const API_BASE_URL = rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`;

export const isBackendAvailable = true; // Connected to Node.js backend

let refreshPromise = null;

/**
 * Perform silent token refresh using stored refresh token
 * Shared promise guarantees only 1 network request even if multiple calls trigger concurrently
 */
export async function refreshAccessToken() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const storedRefreshToken = localStorage.getItem('admire_user_refresh_token');
      if (!storedRefreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-refresh-token': storedRefreshToken,
        },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to refresh token');
      }

      const data = await response.json();
      if (!data.accessToken) {
        throw new Error('No access token in refresh response');
      }

      localStorage.setItem('admire_user_token', data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem('admire_user_refresh_token', data.refreshToken);
      }
      if (data.user) {
        localStorage.setItem('admire_user_data', JSON.stringify(data.user));
      }

      return data;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Helper to decode JWT and get expiration timestamp (in ms)
 */
export function getTokenExpiry(token) {
  if (!token) return 0;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return (payload.exp || 0) * 1000;
  } catch {
    return 0;
  }
}

/**
 * Generic API fetch helper with automatic silent token refresh, cookies & error handling
 */
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('admire_user_token');

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  try {
    let response = await fetch(`${API_BASE_URL}${formattedEndpoint}`, {
      credentials: 'include',
      ...options,
      headers: defaultHeaders,
    });

    // If 401 Unauthorized & not an auth endpoint, attempt automatic token refresh
    if (
      response.status === 401 &&
      !formattedEndpoint.startsWith('/auth/login') &&
      !formattedEndpoint.startsWith('/auth/refresh') &&
      !formattedEndpoint.startsWith('/auth/signup')
    ) {
      try {
        const refreshData = await refreshAccessToken();
        if (refreshData && refreshData.accessToken) {
          // Retry original request with newly refreshed token
          const retryHeaders = {
            ...defaultHeaders,
            Authorization: `Bearer ${refreshData.accessToken}`,
            ...options.headers,
          };
          response = await fetch(`${API_BASE_URL}${formattedEndpoint}`, {
            credentials: 'include',
            ...options,
            headers: retryHeaders,
          });
        }
      } catch (refreshErr) {
        console.warn('[API Client] Auto-refresh failed:', refreshErr.message);
        throw new Error('Session expired. Please log in again.');
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[API Client] Error connecting to backend at ${endpoint}:`, error.message);
    throw error;
  }
}
