import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import excludedRoutes from './excluded-routes';
import { onLogout } from '../utils/logout';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { API_URL, WS_URL } from './urls';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import type { FieldFunctionOptions } from '@apollo/client';
import { getToken } from '../utils/token';

type GraphQLErrorExtensions = {
  originalError?: {
    statusCode?: number;
  };
};

const logoutLink = onError((error) => {
  if (error.graphQLErrors?.length && (error.graphQLErrors[0].extensions as GraphQLErrorExtensions)?.originalError?.statusCode === 401) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const authLink = setContext((_, { header }) => {
  return {
    headers: {
      ...header,
      authorization: getToken(),
    }
  }
})

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
    connectionParams: {
      token: getToken(),
    }
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query) as {
      kind: string;
      operation?: string;
    };

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: {
            keyArgs: false,
            merge,
          },
          messages: {
            keyArgs: ["chatId"],
            merge,
          }
        },
      },
    },
  }),
  credentials: 'include',
  link: logoutLink.concat(authLink).concat(splitLink),
});

function merge<T>(
  existing: T[] = [],
  incoming: T[],
  { args }: FieldFunctionOptions
): T[] {
  const merged = existing ? existing.slice(0) : [];

  if (args && "skip" in args) {
    const skip = (args as { skip?: number }).skip ?? 0;

    for (let i = 0; i < incoming.length; ++i) {
      merged[skip + i] = incoming[i];
    }
  } else {
    return incoming;
  }

  return merged;
}

export default client;
