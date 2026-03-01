import ChatListItem from './chat-list-item/ChatListItem';
import { Box, Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { useEffect, useState } from 'react';
import ChatListAdd from './chat-list-add/ChatListAdd';
import { useGetChats } from '../../hooks/useGetChats';
import { usePath } from '../../hooks/usePath';
import { useMessageCreated } from '../../hooks/useMessageCreated';
import { PAGE_SIZE } from '../../constants/page-size';
import InfiniteScroll from 'react-infinite-scroll-component';
import useCountChats from '../../hooks/useCountChats';
import { useChatCreated } from '../../hooks/useChatCreated';

const ChatList: React.FC = () => {
    const [chatListAddVisible, setChatListAddVisible] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const { data, fetchMore } = useGetChats({
        skip: 0,
        limit: PAGE_SIZE,
    });
    const { path } = usePath();
    const { chatsCount, countChats } = useCountChats();

    useEffect(() => {
        countChats();
    }, []);

    useEffect(() => {
        if (data?.chats.length === 0) {
            countChats();
        }
    }, [data?.chats.length, countChats]);

    useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });
    useChatCreated();

    useEffect(() => {
        const pathSplit = path.split('chats/');
        if (pathSplit.length === 2) {
            setSelectedChatId(pathSplit[1]);
        }
    }, [path]);

    return (
        <>
            <ChatListAdd open={chatListAddVisible} handleClose={() => setChatListAddVisible(false)} />
            <Stack>
                <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
                <Divider />
                <Box id="scrollableDiv" sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '80vh', overflow: 'auto' }}>
                    <InfiniteScroll
                        dataLength={data?.chats?.length ?? 0}
                        next={() => {
                            fetchMore({
                                variables: {
                                    skip: data?.chats.length,
                                    limit: PAGE_SIZE,
                                },
                            });
                        }}
                        hasMore={(data?.chats.length ?? 0) < (chatsCount ?? 0)}
                        loader={<div key={0}>Loading ...</div>}
                        scrollableTarget="scrollableDiv"
                    >
                        {data?.chats && [...data.chats].sort((chatA, chatB) => {
                            if (!chatA.latestMessage) return -1;
                            if (!chatB.latestMessage) return 1;
                            return new Date(chatA.latestMessage.createdAt).getTime() - new Date(chatB.latestMessage.createdAt).getTime();
                        })
                            .map((chat) => (
                                <ChatListItem chat={chat}
                                    selected={selectedChatId === chat._id} key={chat._id}
                                />
                            )).reverse()}
                    </InfiniteScroll>
                </Box>
            </Stack>
        </>

    );
}

export default ChatList;