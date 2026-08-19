/**
 * Centralized API Client Layer for Admire Softech
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const isBackendAvailable = false; // Toggle to true when your Node.js backend is running!

/**
 * Generic API fetch helper designed for backend integration
 */
export async function apiRequest(endpoint, options = {}) {
  if (isBackendAvailable) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn(`[API Client] Error connecting to Node.js backend at ${endpoint}:`, error.message);
      throw error;
    }
  }

  // Simulated latency for smooth loading state demo
  await new Promise((resolve) => setTimeout(resolve, 300));
  return null;
}
