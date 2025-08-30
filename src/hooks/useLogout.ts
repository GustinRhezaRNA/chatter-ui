import { API_URL } from '../constants/urls';

const useLogout = () => {
  const logout = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      // Tangkap semua error termasuk network errors
      console.error('Logout error:', error);

      // Re-throw error agar bisa ditangkap oleh calling code
      throw new Error('Connection failed');
    }
  };

  return { logout };
};

export { useLogout };
