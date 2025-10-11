import type { ApolloCache } from '@apollo/client';
import type { Message } from '../gql/graphql';
import { getMessagesDocument } from '../hooks/useGetMassage';

export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  const messageQueryOptions = {
    query: getMessagesDocument,
    variables: {
      chatId: message.chatId,
    },
  };
  const messages = cache.readQuery({
    ...messageQueryOptions,
  });
  cache.writeQuery({
    ...messageQueryOptions,
    data: {
      messages: (messages?.messages || []).concat(message),
    },
  });
};
