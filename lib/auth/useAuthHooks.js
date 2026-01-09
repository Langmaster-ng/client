'use client';

import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';

/**
 * useAuth Hook
 * Provides authentication context and methods for login/logout
 * @returns {Object} Auth context with user, token, loading, error, and auth methods
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

/**
 * useSignup Hook
 * Specialized hook for signup functionality with form state management
 * @returns {Object} Signup state and methods
 */
export function useSignup() {
  const auth = useAuth();

  const handleSignup = async (signupData) => {
    try {
      const result = await auth.signup(signupData);
      return result;
    } catch (err) {
        console.log(err); 
      throw err;
    }
  };

  return {
    signup: handleSignup,
    isLoading: auth.loading,
    error: auth.error,
    isAuthenticated: auth.isAuthenticated,
  };
}

export default useAuth;
