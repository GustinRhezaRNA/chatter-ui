import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Branding from './Branding';
import MobileBranding from './mobile/MobileBranding';
import Setting from './Setting';
import { Container, Box } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import { authenticatedVar } from '../../../constants/authenticated';

function ResponsiveAppBar() {
    const isAuthenticated = useReactiveVar(authenticatedVar);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Branding />
                    <MobileBranding />
                    <Box sx={{ flexGrow: 1 }} />
                    {isAuthenticated && <Setting />}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
