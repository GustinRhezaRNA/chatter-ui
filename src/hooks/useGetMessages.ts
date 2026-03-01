import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import type { MessagesQueryVariables } from "../gql/graphql";

const getMessagesDocument = graphql(`
  query Messages($chatId: String!, $skip: Int!, $limit: Int!) {
    messages(chatId: $chatId, skip: $skip, limit: $limit) {
      ...MessageFragment
    }
  }
`);

const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(getMessagesDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
};

export { useGetMessages, getMessagesDocument };