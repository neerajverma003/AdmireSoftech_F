import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { apiRequest, refreshAccessToken, getTokenExpiry } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('admire_user_data');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!(localStorage.getItem('admire_user_token') || localStorage.getItem('admire_user_refresh_token'));
  });

  const [isLoading, setIsLoading] = useState(true);
  const refreshTimerRef = useRef(null);

  // Auth modal management state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  /**
   * Schedule automatic silent token refresh 2 minutes before access token expires
   */
  const scheduleSilentRefresh = useCallback((token) => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    if (!token) return;

    const expiryMs = getTokenExpiry(token);
    const now = Date.now();
    const delay = expiryMs > now ? Math.max(expiryMs - now - 120000, 10000) : 10000;

    refreshTimerRef.current = setTimeout(async () => {
      try {
        const storedRefreshToken = localStorage.getItem('admire_user_refresh_token');
        if (!storedRefreshToken) return;

        const refreshData = await refreshAccessToken();
        if (refreshData && refreshData.accessToken) {
          if (refreshData.user) {
            setUser(refreshData.user);
            localStorage.setItem('admire_user_data', JSON.stringify(refreshData.user));
          }
          setIsAuthenticated(true);
          scheduleSilentRefresh(refreshData.accessToken);
        }
      } catch (err) {
        console.warn('[Client Auth] Background silent refresh failed:', err.message);
      }
    }, delay);
  }, []);

  // Validate session with backend on initial load
  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const token = localStorage.getItem('admire_user_token');
      const storedRefreshToken = localStorage.getItem('admire_user_refresh_token');

      if (!token && !storedRefreshToken) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        // Step 1: Try current access token
        if (token) {
          try {
            const response = await apiRequest('/auth/me');
            if (response && response.user) {
              if (isMounted) {
                setUser(response.user);
                setIsAuthenticated(true);
                localStorage.setItem('admire_user_data', JSON.stringify(response.user));
                scheduleSilentRefresh(token);
                setIsLoading(false);
              }
              return;
            }
          } catch (meErr) {
            console.warn('[Client Auth] Access token invalid or expired, attempting refresh...');
          }
        }

        // Step 2: Attempt refresh using stored refresh token
        if (storedRefreshToken) {
          const refreshData = await refreshAccessToken();
          if (refreshData && refreshData.accessToken) {
            const userRes = await apiRequest('/auth/me');
            if (userRes && userRes.user) {
              if (isMounted) {
                setUser(userRes.user);
                setIsAuthenticated(true);
                localStorage.setItem('admire_user_data', JSON.stringify(userRes.user));
                scheduleSilentRefresh(refreshData.accessToken);
                setIsLoading(false);
              }
              return;
            }
          }
        }

        throw new Error('No valid session could be restored');
      } catch (err) {
        console.warn('[Client Auth] Session could not be restored:', err.message);
        if (isMounted) {
          localStorage.removeItem('admire_user_token');
          localStorage.removeItem('admire_user_refresh_token');
          localStorage.removeItem('admire_user_data');
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [scheduleSilentRefresh]);

  /**
   * Listen for window focus / tab visibility to refresh token if expired while inactive
   */
  useEffect(() => {
    const handleVisibilityOrFocus = async () => {
      if (document.visibilityState === 'visible') {
        const token = localStorage.getItem('admire_user_token');
        const refreshToken = localStorage.getItem('admire_user_refresh_token');
        if (!token && !refreshToken) return;

        const expiryMs = getTokenExpiry(token);
        const now = Date.now();
        if (expiryMs <= now + 60000) {
          try {
            const refreshData = await refreshAccessToken();
            if (refreshData && refreshData.accessToken) {
              scheduleSilentRefresh(refreshData.accessToken);
            }
          } catch (err) {
            console.warn('[Client Auth] Window focus refresh failed:', err.message);
          }
        }
      }
    };

    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

    return () => {
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
    };
  }, [scheduleSilentRefresh]);

  /**
   * User Signup
   */
  const signup = async (name, email, password) => {
    try {
      const response = await apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      if (!response || !response.accessToken) {
        throw new Error(response?.message || 'Registration failed.');
      }

      localStorage.setItem('admire_user_token', response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem('admire_user_refresh_token', response.refreshToken);
      }
      localStorage.setItem('admire_user_data', JSON.stringify(response.user));

      setUser(response.user);
      setIsAuthenticated(true);
      scheduleSilentRefresh(response.accessToken);
      closeAuthModal();

      return { success: true, user: response.user };
    } catch (error) {
      console.error('[Client Auth] Signup Error:', error);
      throw error;
    }
  };

  /**
   * User Login
   */
  const login = async (email, password) => {
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!response || !response.accessToken) {
        throw new Error(response?.message || 'Login failed.');
      }

      localStorage.setItem('admire_user_token', response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem('admire_user_refresh_token', response.refreshToken);
      }
      localStorage.setItem('admire_user_data', JSON.stringify(response.user));

      setUser(response.user);
      setIsAuthenticated(true);
      scheduleSilentRefresh(response.accessToken);
      closeAuthModal();

      return { success: true, user: response.user };
    } catch (error) {
      console.error('[Client Auth] Login Error:', error);
      throw error;
    }
  };

  /**
   * User Logout
   */
  const logout = async () => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    try {
      await apiRequest('/auth/logout', { method: 'POST' }).catch(() => {});
    } finally {
      localStorage.removeItem('admire_user_token');
      localStorage.removeItem('admire_user_refresh_token');
      localStorage.removeItem('admire_user_data');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  /**
   * Send Password Reset OTP
   */
  const sendForgotPasswordOtp = async (email) => {
    const response = await apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    return response;
  };

  /**
   * Verify Password Reset OTP
   */
  const verifyOtp = async (email, otp) => {
    const response = await apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
    return response;
  };

  /**
   * Reset Password
   */
  const resetPassword = async (email, otp, newPassword) => {
    const response = await apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, otp, newPassword }),
    });
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signup,
        login,
        logout,
        sendForgotPasswordOtp,
        verifyOtp,
        resetPassword,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
