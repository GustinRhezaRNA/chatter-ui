import { useCallback, useState } from 'react';
import { API_URL } from '../constants/urls';
import { snackVar } from '../constants/snack';
import { UNKNOWN_ERROR_SNACK_MESSAGE } from '../constants/errors';
import { commonFetch } from '../utils/fetch';

const useCountChats = () => {
  const [chatsCount, setChatsCount] = useState<number | undefined>(0);

  const countChats = useCallback(async () => {
    const res = await commonFetch(`${API_URL}/chats/count`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      if (res.status !== 401) {
        snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      }
      return;
    }
    setChatsCount(parseInt(await res.text()));
  }, []);
  return { chatsCount, countChats };
};

export default useCountChats;
