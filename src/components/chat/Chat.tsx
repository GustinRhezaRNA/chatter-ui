import { useParams } from "react-router-dom"
import { useGetChat } from "../../hooks/useGetChat";
import { Box, Divider, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useState } from "react";
import { useGetMessages } from "../../hooks/useGetMassage";

const Chat = () => {
    const params = useParams();
    const [message, setMessage] = useState('');
    const chatId = params._id!;
    const { data, loading } = useGetChat({ _id: chatId });
    const [createMessage] = useCreateMessage(chatId);
    const { data: messages } = useGetMessages({ chatId });


    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Stack sx={{
            height: "100%",
            maxHeight: "100%",
            display: "flex",
            flexDirection: "column"
        }}>
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

            {/* Messages Area */}
            <Box sx={{
                flex: 1,
                p: 2,
                overflow: 'auto',
                backgroundColor: 'background.default'
            }}>
                {messages?.messages?.length ? (
                    <Box>
                        {messages.messages.map((message) => (
                            <Box key={message._id} sx={{ mb: 2 }}>
                                <Typography variant="body1" color="text.primary">
                                    {message.content}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(message.createdAt).toLocaleTimeString()}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No messages yet. Start the conversation!
                    </Typography>
                )}
            </Box>

            {/* Input Area */}
            <Box sx={{
                p: 2,
                borderTop: 1,
                borderColor: 'divider',
                backgroundColor: 'background.paper'
            }}>
                <Paper
                    elevation={1}
                    sx={{
                        p: "8px 12px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: 2
                    }}
                >
                    <InputBase
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Type a message..."
                        multiline
                        maxRows={4}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton
                        onClick={async () => {
                            if (message.trim()) {
                                try {
                                    await createMessage({
                                        variables: {
                                            createMessageInput: {
                                                chatId,
                                                content: message.trim()
                                            }
                                        }
                                    });
                                    setMessage(''); // Clear input after sending
                                } catch (error) {
                                    console.error('Error sending message:', error);
                                }
                            }
                        }}
                        color="primary"
                        sx={{ p: "8px" }}
                        size="small"
                    >
                        <SendIcon />
                    </IconButton>
                </Paper>
            </Box>
        </Stack>
    )
}

export default Chat
