import { useState } from 'react';
import { API_URL } from '../constants/urls';
import client from '../constants/apollo-client';
import { UNKNOWN_ERROR_MESSAGE } from '../constants/errors';

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState<string>();

  const login = async (request: LoginRequest) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      if (!res.ok) {
        if (res.status === 401) {
          setError('Credentials are invalid');
        } else {
          setError(UNKNOWN_ERROR_MESSAGE);
        }
        return;
      }
      setError('');
      await client.refetchQueries({ include: 'active' });
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again later.');
    }
  };
  return { login, error };
};

export { useLogin };
