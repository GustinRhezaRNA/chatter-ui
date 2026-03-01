import { Avatar, Box, Button, CircularProgress, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useGetMe } from "../../hooks/useGetMe";
import UploadIcon from '@mui/icons-material/Upload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";

const Profile = () => {
    const me = useGetMe();
    const navigate = useNavigate();
    const username = me.data?.me?.username ?? '';

    const [editingUsername, setEditingUsername] = useState(false);
    const [usernameInput, setUsernameInput] = useState('');
    const [updateUser, { loading: savingUsername }] = useUpdateUser();

    const handleEditUsername = () => {
        setUsernameInput(username);
        setEditingUsername(true);
    };

    const handleSaveUsername = async () => {
        if (!usernameInput.trim() || usernameInput === username) {
            setEditingUsername(false);
            return;
        }
        try {
            await updateUser({ variables: { updateUserInput: { username: usernameInput.trim() } } });
            snackVar({ message: 'Username updated!', type: 'success' });
        } catch {
            snackVar({ message: 'Failed to update username', type: 'error' });
        } finally {
            setEditingUsername(false);
        }
    };

    const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            formData.append('image', event.target.files![0]);
            const res = await fetch(`${API_URL}/users/image`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            if (!res.ok) throw new Error();
            await me.refetch();
            snackVar({ message: 'Image uploaded successfully', type: 'success' });
        } catch {
            snackVar({ message: 'Failed to upload image', type: 'error' });
        }
    };

    return (
        <Stack sx={{ minHeight: '100dvh' }}>
            {/* Top bar */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderBottom: 1,
                borderColor: 'divider',
                backgroundColor: 'background.paper',
            }}>
                <IconButton onClick={() => navigate(-1)} aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ ml: 1 }}>Profile</Typography>
            </Box>

            {/* Content */}
            <Stack spacing={4} sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Avatar sx={{ width: 128, height: 128 }} src={me.data?.me?.imageUrl} />

                {/* Editable username */}
                {editingUsername ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            autoFocus
                            size="small"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveUsername();
                                if (e.key === 'Escape') setEditingUsername(false);
                            }}
                            disabled={savingUsername}
                        />
                        <IconButton onClick={handleSaveUsername} color="primary" disabled={savingUsername}>
                            {savingUsername ? <CircularProgress size={20} /> : <CheckIcon />}
                        </IconButton>
                        <IconButton onClick={() => setEditingUsername(false)} disabled={savingUsername}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h4">
                            {username ? username[0].toUpperCase() + username.slice(1) : 'User'}
                        </Typography>
                        <IconButton onClick={handleEditUsername} size="small">
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )}

                <Typography variant="body2" color="text.secondary">{me.data?.me?.email}</Typography>

                <Button component="label" variant="contained" size="large" startIcon={<UploadIcon />}>
                    Upload Photo
                    <input type="file" hidden onChange={handleUploadImage} />
                </Button>
            </Stack>
        </Stack>
    );
};

export default Profile;
