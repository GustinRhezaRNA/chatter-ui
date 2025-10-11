import { useLocation, useParams } from "react-router-dom"
import { useGetChat } from "../../hooks/useGetChat";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    InputBase,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMassage";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import type { Message } from "../../gql/graphql";

const Chat = () => {
    const params = useParams();
    const location = useLocation();
    const [message, setMessage] = useState('');
    const chatId = params._id!;
    const { data } = useGetChat({ _id: chatId });
    const [createMessage] = useCreateMessage();
    const { data: existingMessages } = useGetMessages({ chatId });
    const [messages, setMessages] = useState<Message[]>([]);
    const divRef = useRef<HTMLDivElement | null>(null);
    useMessageCreated({ chatId });

    const scrollToBottom = () => divRef.current?.scrollIntoView();
    useEffect(() => {
        if (existingMessages) {
            setMessages(existingMessages.messages);
        }
    }, [existingMessages])

    useEffect(() => {
        setMessage("");
        scrollToBottom();
    }, [location.pathname, messages]);

    const handleCreateMessage = async () => {
        await createMessage({
            variables: {
                createMessageInput: {
                    content: message,
                    chatId
                }
            },
        });
        setMessage("");
        scrollToBottom();
    };

    return (
        <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
            {/* Header */}
            <Box sx={{
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                backgroundColor: 'background.paper'
            }}>
                <Typography variant="h6" component="h1">
                    {data?.chat?.name || 'Chat'}
                </Typography>
            </Box>
            {/* Messages */}
            <Box sx={{ maxHeight: "70vh", overflow: "auto", p: 1 }}>
                {[...messages].sort((messageA, messageB) =>
                    new Date(messageA.createdAt).getTime() -
                    new Date(messageB.createdAt).getTime())
                    .map((message) => (
                        <Box key={message._id}
                            sx={{ display: "flex", alignItems: "flex-start", mb: 2, gap: 1 }}>
                            <Box sx={{ flexShrink: 0 }}>
                                <Avatar src="" sx={{ width: 40, height: 40 }} />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Paper sx={{
                                    width: "fit-content",
                                    maxWidth: "100%",
                                    wordWrap: "break-word",
                                    overflow: "hidden"
                                }}>
                                    <Typography sx={{
                                        p: "0.75rem",
                                        wordBreak: "break-word",
                                        overflowWrap: "break-word"
                                    }}>
                                        {message.content}
                                    </Typography>
                                </Paper>
                                <Typography variant="caption" sx={{
                                    ml: 0.5,
                                    color: "text.secondary",
                                    display: "block",
                                    mt: 0.5
                                }}>
                                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                <div ref={divRef}></div>
            </Box>
            {/* Input */}
            <Paper
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    justifySelf: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    margin: '1rem 0'
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, width: "100%" }}
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                    placeholder="Message"
                    onKeyDown={async (event) => {
                        if (event.key === "Enter") {
                            await handleCreateMessage();
                        }
                    }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    onClick={handleCreateMessage}
                    color="primary"
                    sx={{ p: "10px" }}
                >
                    <SendIcon />
                </IconButton>
            </Paper>
        </Stack>
    );
};

export default Chat
