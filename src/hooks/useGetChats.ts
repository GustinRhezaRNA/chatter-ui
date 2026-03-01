import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import type { QueryChatsArgs } from '../gql/graphql';

export const getChatsDocument = graphql(`
  query GetChats($skip: Int!, $limit: Int!) {
    chats(skip: $skip, limit: $limit) {
      ...ChatFragment
    }
  }
`);

const useGetChats = (variables: QueryChatsArgs) => {
  return useQuery(getChatsDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });
};

export { useGetChats };