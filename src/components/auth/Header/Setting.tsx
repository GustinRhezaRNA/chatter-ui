import { Avatar, Box, IconButton, Menu, Tooltip } from '@mui/material'
import { MenuItem, Typography } from '@mui/material'
import React from 'react';
import { useLogout } from '../../../hooks/useLogout';
import { onLogout } from '../../../utils/logout';
import { snackVar } from '../../../constants/snack';
import { UNKNOWN_ERROR_SNACK_MESSAGE } from '../../../constants/errors';


const Setting = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { logout } = useLogout();

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
                        <Avatar alt="Remy Sharp" src="" />
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
                        key="logout"
                        onClick={async () => {
                            console.log('MenuItem clicked'); // Debug 1
                            try {
                                console.log('About to call logout'); // Debug 2
                                await logout();
                                console.log('Logout successful'); // Debug 3
                                onLogout();
                                handleCloseUserMenu();
                            } catch (err) {
                                console.log('MenuItem caught error:', err);
                                snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
                                console.log('snackVar set to:', snackVar()); // Debug log
                                console.log('UNKNOWN_ERROR_SNACK_MESSAGE:', UNKNOWN_ERROR_SNACK_MESSAGE);
                            }
                        }}
                    >
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box ></>
    )
}

export default Setting