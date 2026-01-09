'use client';

import { createContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://lang-learn-app-app-production.up.railway.app';


  useEffect(() => {
    const storedToken = sessionStorage.getItem('lm_token');
    const storedUser = sessionStorage.getItem('lm_user');

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    }
    setLoading(false);
  }, []);


  const parseResponse = useCallback(async (res) => {
    const text = await res.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      throw new Error('Invalid server response');
    }
  }, []);

 
  const apiPost = useCallback(
    async (endpoint, payload) => {
      try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await parseResponse(res);


        if (data?.status === 'error') {
          throw new Error(data.message || 'Request failed');
        }

        return data;
      } catch (err) {
        throw err;
      }
    },
    [API_BASE, parseResponse]
  );


  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiPost('/v1/api/login', { email, password });

   
        const authToken = res?.data?.token;

        if (!authToken) {
          throw new Error('Login succeeded but token missing');
        }

        // Store token
        sessionStorage.setItem('lm_token', authToken);
        setToken(authToken);

        // Store user data if available
        if (res?.data?.user) {
          sessionStorage.setItem('lm_user', JSON.stringify(res.data.user));
          setUser(res.data.user);
        }

        return { success: true, token: authToken, user: res.data.user };
      } catch (err) {
        const message = err.message || 'Login failed';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiPost]
  );

  // Signup function
  const signup = useCallback(
    async (signupData) => {
      try {
        setLoading(true);
        setError(null);

        const payload = {
          email: signupData.email,
          password: signupData.password,
          username: signupData.username,
          full_name: signupData.fullName,
          preferred_language: signupData.preferredLanguage,
          proficiency_level: signupData.proficiencyLevel,
          agree_to_terms: true,
        };

        const res = await apiPost('/v1/api/register', payload);

        // Signup endpoint only returns success message, no token
        // User must log in separately to get token
        return {
          success: true,
          message: res.message || 'User registered successfully',
        };
      } catch (err) {
        const message = err.message || 'Signup failed';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiPost]
  );

 
  const logout = useCallback(() => {
    try {
   
      sessionStorage.removeItem('lm_token');
      sessionStorage.removeItem('lm_user');

      
      setUser(null);
      setToken(null);
      setError(null);

      return { success: true };
    } catch (err) {
      const message = 'Logout failed';
      setError(message);
      throw err;
    }
  }, []);

  
  const isAuthenticated = !!token;

  const value = {
   
    user,
    token,
    loading,
    error,
    isAuthenticated,

    // Methods
    login,
    signup,
    logout,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
