import { useCallback, useState } from 'react';
import { API_URL } from '../constants/urls';
import { snackVar } from '../constants/snack';
import { UNKNOWN_ERROR_SNACK_MESSAGE } from '../constants/errors';
import { commonFetch } from '../utils/fetch';

const useCountMessages = (chatId: string) => {
  const [messagesCount, setmessagesCount] = useState<number | undefined>(0);

  const countMessages = useCallback(async () => {
    const res = await commonFetch(`${API_URL}/messages/count?chatId=${chatId}`, {
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
    const { messages } = await res.json();
    setmessagesCount(messages);
  }, [chatId]);
  return { messagesCount, countMessages };
};

export default useCountMessages;
