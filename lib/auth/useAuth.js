'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api/apiClient';

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const res = await apiClient('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });


      if (res.status !== 'success') {
        throw new Error(res.message || 'Login failed');
      }

    
      const token =
        res.data?.token ||  
        res.jwt;             

      const user =
        res.data?.user ||   
        null;               

      if (!token) {
        throw new Error('Authentication token not returned by server');
      }

      
      localStorage.setItem('langmaster_token', token);

      if (user) {
        localStorage.setItem('langmaster_user', JSON.stringify(user));
      }

      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('langmaster_token');
    localStorage.removeItem('langmaster_user');
  };

  return {
    login,
    logout,
    loading,
  };
}
