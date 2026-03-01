import { Avatar, Box, IconButton, Menu, Tooltip } from '@mui/material'
import { MenuItem, Typography } from '@mui/material'
import React from 'react';
import { useLogout } from '../../../hooks/useLogout';
import { onLogout } from '../../../utils/logout';
import { snackVar } from '../../../constants/snack';
import { authenticatedVar } from '../../../constants/authenticated';
import router from '../../Routes';
import { useGetMe } from '../../../hooks/useGetMe';


const Setting = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { logout } = useLogout();

    const me = useGetMe();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={me.data?.me?.username} src={me.data?.me?.imageUrl} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem
                        key="profile"
                        onClick={() => {
                            handleCloseUserMenu();
                            router.navigate('/profile');
                        }}
                    >
                        <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem
                        key="logout"
                        onClick={async () => {
                            // Set logged-out state IMMEDIATELY so Guard doesn't
                            // misread the post-logout getMe 401 as "session expired"
                            authenticatedVar(false);
                            try {
                                await logout();
                            } catch {
                                // Server call failed — still clear locally
                            }
                            handleCloseUserMenu();
                            onLogout();
                            snackVar({ message: 'Logged out successfully', type: 'success' });
                        }}
                    >
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box ></>
    )
}

export default Setting