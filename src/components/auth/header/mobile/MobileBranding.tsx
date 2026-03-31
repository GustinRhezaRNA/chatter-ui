import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import router from '../../../Routes'

const MobileBranding = () => {
    return (
        <>
            <Box
                component="img"
                src="/icon.png"
                alt="Chatter icon"
                onClick={() => router.navigate('/')}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    cursor: 'pointer',
                    height: 48,
                    mr: 2,
                }}
            />
            <Typography
                variant="h5"
                noWrap
                component="a"
                onClick={() => router.navigate('/')}
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    cursor: 'pointer',
                    textDecoration: 'none',
                }}
            >
                CHATTER
            </Typography>
        </>
    )
}

export default MobileBranding