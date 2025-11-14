import { Button, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetMe } from '../../hooks/useGetMe';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
    submitLabel: string;
    onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
    children?: React.ReactNode;
    extraFields? : React.ReactNode[];
    error?: string;
}

const Auth = ({ submitLabel, onSubmit, children, error, extraFields }: AuthProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data } = useGetMe();
    const navigate = useNavigate();


    useEffect(() => {
        if (data) {
            navigate('/')
        }
    }, [data, navigate])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit({ email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack
                spacing={3}
                sx={{
                    height: '100vh',
                    maxWidth: {
                        xs: '70%',
                        sm: '60%',
                        md: '50%',
                        lg: '40%',
                        xl: '30%',
                    },
                    margin: '0 auto',
                    justifyContent: 'center',
                }}
            >
                <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    error={!!error}
                    helperText={error}
                />
                {extraFields}
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    error={!!error}
                    helperText={error}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {submitLabel}
                </Button>
                {children}
            </Stack>
        </form>
    );
};

export default Auth;
