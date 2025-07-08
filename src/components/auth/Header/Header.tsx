import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Branding from './Branding';
import MobileNavigation from './mobile/MobileNavigation';
import MobileBranding from './mobile/MobileBranding';
import Navigation from './Navigation';
import Setting from './Setting';
import { Container } from '@mui/material';

const pages: string[] = [];


function ResponsiveAppBar() {


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Branding />
                    <MobileNavigation pages={pages} />
                    <MobileBranding />
                    <Navigation pages={pages} />
                    <Setting />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
