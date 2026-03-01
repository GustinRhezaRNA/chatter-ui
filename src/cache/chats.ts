import { ApolloCache } from '@apollo/client';
import type { Chat } from '../gql/graphql';
import { getChatsDocument } from '../hooks/useGetChats';

export const updateChats = (cache: ApolloCache<any>, chat: Chat) => {
    const existingChats = cache.readQuery({ query: getChatsDocument })?.chats || [];

    if (existingChats.some((c) => c._id === chat._id)) {
        return;
    }

    cache.writeQuery({
        query: getChatsDocument,
        data: {
            chats: [chat, ...existingChats],
        },
    });
};
