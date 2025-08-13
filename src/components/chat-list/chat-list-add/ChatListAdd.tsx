import { Box, Button, FormControlLabel, FormGroup, IconButton, InputBase, Modal, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useCreateChat } from "../../../hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors";

interface ChatListAddProps {
    open: boolean;
    handleClose: () => void;
}

const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
    const [isPrivate, setIsPrivate] = useState(false);
    const [error, setError] = useState<string >("");
    const [name, setName] = useState<string >("");
    const [createChat] = useCreateChat();
    const onClose = () => {
        setIsPrivate(false);
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
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={isPrivate}
                                    type="checkbox"
                                    value={isPrivate}
                                    onChange={(e) => setIsPrivate(e.target.checked)}
                                />
                            }
                            label="Private"
                        >
                        </FormControlLabel>
                    </FormGroup>
                    {
                        isPrivate ? (
                            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
                                <InputBase sx={{ ml: "1", flex: "1" }} placeholder="Search Users" />
                                <IconButton sx={{ p: "10px" }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        ) : (
                            <TextField error={!!error} helperText={error} label="Name" onChange={(e) => setName(e.target.value)} />

                        )
                    }
                    <Button variant="outlined" onClick={async () => {
                        if (!name && !isPrivate) {
                            setError("Name is required for group chats");
                            return;
                        }
                        try {
                            await createChat({
                                variables: {
                                    createChatInput: {
                                        isPrivate,
                                        name: name || undefined,
                                    },
                                },
                            })
                            onClose();
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