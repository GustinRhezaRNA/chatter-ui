import { useSubscription } from '@apollo/client';
import { graphql } from '../gql';
import { updateChats } from '../cache/chats';
import type { Chat } from '../gql/graphql';

const chatCreatedDocument = graphql(`
  subscription chatCreated {
    chatCreated {
      ...ChatFragment
    }
  }
`);

export const useChatCreated = () => {
    return useSubscription(chatCreatedDocument, {
        onData: ({ client, data }) => {
            if (data.data?.chatCreated) {
                updateChats(client.cache, data.data.chatCreated as Chat);
            }
        },
    });
};
