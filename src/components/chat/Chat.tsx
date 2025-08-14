import { useParams } from "react-router-dom"
import { useGetChat } from "../../hooks/useGetChat";
import { Box, Divider, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
    const params = useParams();
    const { data, loading } = useGetChat({ _id: params._id! });

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
                <Typography variant="body2" color="text.secondary">
                    No messages yet. Start the conversation!
                </Typography>
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
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Type a message..."
                        multiline
                        maxRows={4}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton
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
