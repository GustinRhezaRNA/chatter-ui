import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useCreateChat } from "../../../hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors";
import router from "../../Routes";

interface ChatListAddProps {
    open: boolean;
    handleClose: () => void;
}

const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
    const [error, setError] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [createChat] = useCreateChat();
    const onClose = () => {
        setName("");
        setError("");
        handleClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={
                {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }
            }>
                <Stack spacing={2}>
                    <Typography variant="h6" component="h2">
                        Add New Chat
                    </Typography>
                    <TextField error={!!error} helperText={error} label="Name" onChange={(e) => setName(e.target.value)} />
                    <Button variant="outlined" onClick={async () => {
                        if (!name) {
                            setError("Name is required for group chats");
                            return;
                        }
                        try {
                            const chat = await createChat({
                                variables: {
                                    createChatInput: { name },
                                },
                            });
                            onClose();
                            router.navigate(`/chats/${chat.data?.createChat._id}`);
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        } catch (e) {
                            setError(UNKNOWN_ERROR_MESSAGE);
                        }

                    }}>Save</Button>
                </Stack>
            </Box>
        </Modal >
    )
}

export default ChatListAdd