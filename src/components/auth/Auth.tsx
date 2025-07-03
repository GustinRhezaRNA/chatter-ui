import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'

interface AuthProps {
    submitLabel: string;
    onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
    children?: React.ReactNode;
    error?: string;
}

const Auth = ({ submitLabel, onSubmit, children, error}: AuthProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Stack spacing={3} sx={{
            height: '100vh', maxWidth: {
                xs: '70%', // Full width on extra small screens
                sm: '60%', // 400px on small screens and up
                md: '50%', // 500px on medium screens and up
                lg: '40%', // 600px on large screens and up
                xl: '30%' // 700px on extra large screens and up
            }, margin: '0 auto', justifyContent: 'center'
        }}>
            <TextField type='email'
                label='Email'
                variant='outlined'
                fullWidth margin='normal'
                value={email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
                error={!!error}
                helperText={error}
                />
            <TextField type='password'
                label='Password'
                variant='outlined'
                fullWidth
                margin='normal'
                value={password}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
                error={!!error}
                helperText={error}
            />
            <Button variant='contained' color='primary' fullWidth onClick={() =>
                onSubmit({ email, password })
            }>
                {submitLabel}
            </Button>
            {children}
        </Stack>
    )
}

export default Auth