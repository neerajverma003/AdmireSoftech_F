import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../api/client';

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
    return !!localStorage.getItem('admire_user_token');
  });

  const [isLoading, setIsLoading] = useState(true);

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

  // Validate session with backend on initial load
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('admire_user_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiRequest('/auth/me');
        if (response && response.user) {
          setUser(response.user);
          setIsAuthenticated(true);
          localStorage.setItem('admire_user_data', JSON.stringify(response.user));
        }
      } catch (err) {
        console.warn('[Client Auth] Token validation failed, attempting refresh...');
        try {
          // Attempt silent refresh via HttpOnly cookie
          const refreshRes = await apiRequest('/auth/refresh-token', { method: 'POST' });
          if (refreshRes && refreshRes.accessToken) {
            localStorage.setItem('admire_user_token', refreshRes.accessToken);
            const userRes = await apiRequest('/auth/me');
            if (userRes && userRes.user) {
              setUser(userRes.user);
              setIsAuthenticated(true);
              localStorage.setItem('admire_user_data', JSON.stringify(userRes.user));
              setIsLoading(false);
              return;
            }
          }
        } catch (refreshErr) {
          console.warn('[Client Auth] Token refresh failed:', refreshErr.message);
        }

        // Clean up invalid session
        localStorage.removeItem('admire_user_token');
        localStorage.removeItem('admire_user_refresh_token');
        localStorage.removeItem('admire_user_data');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signup,
        login,
        logout,
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
