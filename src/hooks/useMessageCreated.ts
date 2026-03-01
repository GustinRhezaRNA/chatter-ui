import { useSubscription } from '@apollo/client';
import { graphql } from '../gql';
import type { Message, SubscriptionMessageCreatedArgs } from '../gql/graphql';
import { updateLatestMessage } from '../cache/latest-message';

const messageCreatedDocument = graphql(`
  subscription messageCreated($chatIds: [String!]!) {
    messageCreated(chatIds: $chatIds) {
      ...MessageFragment
    }
  }
`);

export const useMessageCreated = (
  variables: SubscriptionMessageCreatedArgs,
  onMessage?: (message: Message) => void,
) => {
  return useSubscription(messageCreatedDocument, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) {
        updateLatestMessage(client.cache, data.data.messageCreated);
        onMessage?.(data.data.messageCreated);
      }
    },
  });
};
