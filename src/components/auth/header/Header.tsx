import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Branding from './Branding';
import MobileNavigation from './mobile/MobileNavigation';
import MobileBranding from './mobile/MobileBranding';
import Navigation from './Navigation';
import Setting from './Setting';
import { Container } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import { authenticatedVar } from '../../../constants/authenticated';
import type { Page } from '../../../interfaces/page.interface';

const pages: Page[] = []

const unauthenticatedPages: Page[] = [
    { title: 'Login', path: '/login' },
    { title: 'Signup', path: '/signup' },
];

function ResponsiveAppBar() {
    const isAuthenticated = useReactiveVar(authenticatedVar);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Branding />
                    <MobileNavigation pages={isAuthenticated ? pages : unauthenticatedPages} />
                    <MobileBranding />
                    <Navigation pages={isAuthenticated ? pages : unauthenticatedPages} />
                    {isAuthenticated && <Setting />}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
