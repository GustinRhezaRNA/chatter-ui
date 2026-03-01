import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetMe } from '../../hooks/useGetMe';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface FieldErrors {
    email?: string;
    password?: string;
    [key: string]: string | undefined;
}

interface AuthProps {
    submitLabel: string;
    onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
    children?: React.ReactNode;
    extraFields?: React.ReactNode[];
    fieldErrors?: FieldErrors;
    title: string;
    subtitle: React.ReactNode;
    /** @deprecated use fieldErrors instead */
    error?: string;
}

const inputStyles = {
    '& .MuiOutlinedInput-root': {
        color: 'white',
        backgroundColor: '#303038',
        borderRadius: '8px',
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: '#555',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#7B61FF',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#999',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#7B61FF',
    },
    mb: 2,
};

const Auth = ({ submitLabel, onSubmit, children, error, fieldErrors, extraFields, title, subtitle }: AuthProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data } = useGetMe();
    const navigate = useNavigate();

    const emailError = fieldErrors?.email;
    const passwordError = fieldErrors?.password ?? error;

    useEffect(() => {
        if (data && data.me) { // Only navigate if we actually have a logged-in user
            navigate('/')
        }
    }, [data, navigate])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit({ email, password });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100vh', bgcolor: '#222328' }}>
            {/* Left Image Side */}
            <Box
                sx={{
                    flexBasis: { xs: '30%', md: '50%' },
                    flexShrink: 0,
                    flexGrow: 0,
                    backgroundImage: 'url(/auth_bg.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: { xs: 3, md: 6 },
                    color: 'white'
                }}
            >
                {/* Top Bar on Image */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
                        Chatter
                    </Typography>
                </Box>

                {/* Bottom Text on Image (Hidden on very small mobile to save space) */}
                <Box sx={{ textAlign: 'center', mb: { xs: 1, md: 4 }, display: { xs: 'none', sm: 'block' } }}>
                    <Typography variant="h3" sx={{ fontWeight: 500, mb: 3, fontSize: { sm: '2rem', md: '3rem' } }}>
                        Capturing Moments,<br />Creating Memories
                    </Typography>
                    {/* Fake carousel indicators */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Box sx={{ width: 20, height: 4, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
                        <Box sx={{ width: 20, height: 4, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
                        <Box sx={{ width: 30, height: 4, bgcolor: 'white', borderRadius: 2 }} />
                    </Box>
                </Box>
            </Box>

            {/* Right Form Side */}
            <Box
                sx={{
                    flexBasis: { xs: '70%', md: '50%' },
                    flexShrink: 0,
                    flexGrow: 0,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: { xs: 3, sm: 4, md: 8 }
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 450 }}>
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                        {title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#aaa', mb: 5 }}>
                        {subtitle}
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        {extraFields}

                        <TextField
                            type="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                            sx={inputStyles}
                        />

                        <TextField
                            type="password"
                            label="Enter your password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                            sx={inputStyles}
                        />

                        {children}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 3,
                                mb: 4,
                                bgcolor: '#7B61FF',
                                p: 1.5,
                                fontSize: '1rem',
                                textTransform: 'none',
                                borderRadius: '8px',
                                '&:hover': {
                                    bgcolor: '#6A52DE'
                                }
                            }}
                        >
                            {submitLabel}
                        </Button>
                    </form>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Divider sx={{ flexGrow: 1, borderColor: '#444' }} />
                        <Typography sx={{ color: '#888', px: 2, fontSize: '0.875rem' }}>
                            Or register with
                        </Typography>
                        <Divider sx={{ flexGrow: 1, borderColor: '#444' }} />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<GoogleIcon sx={{ color: '#EA4335' }} />}
                            sx={{
                                color: 'white',
                                borderColor: '#444',
                                textTransform: 'none',
                                py: 1,
                                borderRadius: '8px',
                                '&:hover': { borderColor: '#666', bgcolor: 'rgba(255,255,255,0.05)' }
                            }}
                        >
                            Google
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<AppleIcon />}
                            sx={{
                                color: 'white',
                                borderColor: '#444',
                                textTransform: 'none',
                                py: 1,
                                borderRadius: '8px',
                                '&:hover': { borderColor: '#666', bgcolor: 'rgba(255,255,255,0.05)' }
                            }}
                        >
                            Apple
                        </Button>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
};

export default Auth;
