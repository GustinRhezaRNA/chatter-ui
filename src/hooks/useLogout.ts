import API_URL from '../constants/urls';

const useLogout = () => {
  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  };

  return { logout };
};

export { useLogout };
