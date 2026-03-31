import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import router from '../../Routes'

const Branding = () => {
    return (
        <>
            <Box
                component="img"
                src="/icon.png"
                alt="Chatter icon"
                onClick={() => router.navigate('/')}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    cursor: 'pointer',
                    height: 48,
                    mr: 2,
                }}
            />
            <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => router.navigate('/')}
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
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