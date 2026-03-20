import Typography from '@mui/material/Typography'
import Forum from '@mui/icons-material/Forum'
import router from '../../Routes'
const Branding = () => {
    return (
        <>
            <Forum sx={{ display: { xs: 'none', md: 'flex' } }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => router.navigate('/')}
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    cursor: 'pointer',
                }}
            >
                CHATTER
            </Typography>
        </>
    )
}

export default Branding