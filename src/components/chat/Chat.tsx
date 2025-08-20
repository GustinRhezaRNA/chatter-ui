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

const Chat = () => {
    const params = useParams();
    const location = useLocation();
    const [message, setMessage] = useState('');
    const chatId = params._id!;
    const { data } = useGetChat({ _id: chatId });
    const [createMessage] = useCreateMessage(chatId);
    const { data: messages } = useGetMessages({ chatId });
    const divRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => divRef.current?.scrollIntoView();

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
            <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
                {messages?.messages.map((message) => (
                    <Box key={message._id} sx={{ display: "flex", alignItems: "flex-start", mb: 1, gap: 1.5 }}>
                        <Avatar src="" sx={{ width: 36, height: 36 }} />
                        <Box sx={{ flex: 1 }}>
                            <Paper sx={{ width: "fit-content", maxWidth: "60%" }}>
                                <Typography sx={{ p: "0.5rem" }}>
                                    {message.content}
                                </Typography>
                            </Paper>
                            <Typography variant="caption" sx={{ ml: 0.5, color: "text.secondary" }}>
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
