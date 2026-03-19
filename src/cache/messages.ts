import type { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import type { Message } from '../gql/graphql';
import { getMessagesDocument } from '../hooks/useGetMessages';
import { PAGE_SIZE } from '../constants/page-size';

export const updateMessages = (cache: ApolloCache<NormalizedCacheObject>, message: Message) => {
  const messageQueryOptions = {
    query: getMessagesDocument,
    variables: {
      chatId: message.chatId,
      skip: 0,
      limit: PAGE_SIZE,
    },
  };
  
  const messages = cache.readQuery<any>({
    ...messageQueryOptions,
  });

  const existingMessages = messages?.messages || [];
  if (existingMessages.some((m: Message) => m._id === message._id)) {
    return;
  }

  cache.writeQuery({
    ...messageQueryOptions,
    data: {
      messages: [...existingMessages, message],
    },
  });
};
