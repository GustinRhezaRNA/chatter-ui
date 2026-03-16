import { useState } from 'react';
import { API_URL } from '../constants/urls';
import client from '../constants/apollo-client';
import { UNKNOWN_ERROR_MESSAGE } from '../constants/errors';
import { commonFetch } from '../utils/fetch';
import { setToken } from '../utils/token';

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState<string>();

  const login = async (request: LoginRequest): Promise<string | undefined> => {
    try {
      const res = await commonFetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      if (!res.ok) {
        const msg = res.status === 401 ? 'Credentials are invalid' : UNKNOWN_ERROR_MESSAGE;
        setError(msg);
        return msg;
      }
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
      }
      setError('');
      await client.refetchQueries({ include: 'active' });
      return undefined;
    } catch (error) {
      console.error('Login error:', error);
      const msg = 'Network error. Please try again later.';
      setError(msg);
      return msg;
    }
  };
  return { login, error };
};

export { useLogin };
