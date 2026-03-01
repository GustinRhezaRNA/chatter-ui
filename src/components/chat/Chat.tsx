import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useGetChat } from "../../hooks/useGetChat";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    InputBase,
    Paper,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import type { Message } from "../../gql/graphql";
import { PAGE_SIZE } from "../../constants/page-size";
import useCountMessages from "../../hooks/useCountMessages";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { useGetMe } from "../../hooks/useGetMe";
import { useUpdateChat } from "../../hooks/useUpdateChat";

const Chat = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [message, setMessage] = useState('');
    const chatId = params._id!;
    const { data } = useGetChat({ _id: chatId });
    const [createMessage] = useCreateMessage();
    const { data: existingMessages } = useGetMessages({ chatId, skip: 0, limit: PAGE_SIZE });
    const { data: meData } = useGetMe();
    const myId = meData?.me?._id?.toString();
    const [messages, setMessages] = useState<Message[]>([]);
    const divRef = useRef<HTMLDivElement | null>(null);
    const { countMessages } = useCountMessages(chatId);

    // Chat edit dialog
    const [editOpen, setEditOpen] = useState(false);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [updateChat] = useUpdateChat();

    const handleOpenEdit = () => {
        setEditName(data?.chat?.name ?? '');
        setEditDescription(data?.chat?.description ?? '');
        setEditOpen(true);
    };

    const handleSaveChat = async () => {
        await updateChat({
            variables: {
                updateChatInput: {
                    _id: chatId,
                    name: editName || undefined,
                    description: editDescription || undefined,
                },
            },
            refetchQueries: ['chat'],
        });
        setEditOpen(false);
    };

    useEffect(() => {
        countMessages();
    }, [countMessages]);

    const scrollToBottom = () => divRef.current?.scrollIntoView();
    useEffect(() => {
        if (existingMessages) {
            setMessages(existingMessages.messages);
        }
    }, [existingMessages])

    // Subscribe to new messages in this chat and append them in real-time
    useMessageCreated(
        { chatIds: [chatId] },
        () => {
            scrollToBottom();
        }
    );

    useEffect(() => {
        setMessage("");
        scrollToBottom();
    }, [location.pathname, messages]);

    const handleCreateMessage = async () => {
        if (!message.trim()) return;

        try {
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
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <Stack sx={{ height: isMobile ? '100dvh' : 'calc(100vh - 64px)', justifyContent: "space-between" }}>
            {/* Header */}
            <Box sx={{
                p: 1.5,
                borderBottom: 1,
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                {isMobile && (
                    <IconButton onClick={() => navigate('/')} edge="start" aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                )}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h6" component="h1" noWrap>
                        {data?.chat?.name || 'Chat'}
                    </Typography>
                    {data?.chat?.description && (
                        <Typography variant="caption" color="text.secondary" noWrap display="block">
                            {data.chat.description}
                        </Typography>
                    )}
                </Box>
                <IconButton onClick={handleOpenEdit} aria-label="edit chat" size="small">
                    <EditIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* Edit Chat Dialog */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>Edit Chat</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <TextField
                        label="Chat Name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        label="Description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Optional description..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveChat} variant="contained" disabled={!editName.trim()}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Messages + Input — shared background, messages scroll independently */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                {/* Background image — covers entire area */}
                <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/background.jpg)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    opacity: 0.1,
                    pointerEvents: 'none',
                    zIndex: 0,
                }} />

                {/* Scrollable message list */}
                <Box sx={{ flex: 1, overflow: 'auto', p: 3, position: 'relative', zIndex: 1 }}>
                    {[...messages].sort((messageA, messageB) =>
                        new Date(messageA.createdAt).getTime() -
                        new Date(messageB.createdAt).getTime())
                        .map((message) => {
                            const isOwn = message.user?._id?.toString() === myId;
                            return (
                                <Box key={message._id} sx={{
                                    display: "flex",
                                    flexDirection: isOwn ? 'row-reverse' : 'row',
                                    alignItems: "flex-start",
                                    mb: 2,
                                    gap: 1,
                                }}>
                                    {/* Avatar + username */}
                                    <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
                                        <Box sx={{ flexShrink: 0 }}>
                                            <Avatar src={message.user?.imageUrl} sx={{ width: 36, height: 36 }} />
                                        </Box>
                                        <Typography variant="caption">{message.user?.username}</Typography>
                                    </Stack>

                                    {/* Bubble */}
                                    <Box sx={{ minWidth: 0, maxWidth: '70%', display: 'flex', flexDirection: 'column', alignItems: isOwn ? 'flex-end' : 'flex-start' }}>
                                        <Paper sx={{
                                            width: "fit-content",
                                            maxWidth: "100%",
                                            wordWrap: "break-word",
                                            overflow: "hidden",
                                            backgroundColor: isOwn ? '#1a2c47ff' : 'rgba(40,40,40,0.85)',
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
                                            mx: 0.5,
                                            color: "text.secondary",
                                            display: "block",
                                            mt: 0.5
                                        }}>
                                            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })}
                    <div ref={divRef}></div>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pb: 1.5,
                    pt: 1,
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <Paper
                        sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            width: "90%",
                            borderRadius: '1rem',
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
                            sx={{ p: "10px", color: "#6A52DE" }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Paper>
                </Box>
            </Box>
        </Stack>
    );
};

export default Chat
