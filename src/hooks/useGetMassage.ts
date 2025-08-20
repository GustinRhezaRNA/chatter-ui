import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import type { MessagesQueryVariables } from "../gql/graphql";

const getMessagesDocument = graphql(`
  query Messages($chatId: String!) {
    messages(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(getMessagesDocument, { variables });
};

export { useGetMessages, getMessagesDocument };