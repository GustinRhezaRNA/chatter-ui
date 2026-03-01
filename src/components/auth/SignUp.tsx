import { useState } from 'react'
import Auth, { type FieldErrors } from './Auth'
import { Link } from 'react-router-dom'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useCreateUser } from '../../hooks/useCreateUser'
import { extractAllErrors } from '../../utils/error'
import { useLogin } from '../../hooks/useLogin'
import { UNKNOWN_ERROR_MESSAGE } from '../../constants/errors'
import { snackVar } from '../../constants/snack'

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

const SignUp = () => {
    const [createUser] = useCreateUser()
    const [username, setUsername] = useState("")
    const [agreed, setAgreed] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const { login } = useLogin()

    const routeErrors = (errors: string[]): FieldErrors => {
        const result: FieldErrors = {};
        for (const msg of errors) {
            const lower = msg.toLowerCase();
            if (lower.includes('password')) result.password = msg;
            else if (lower.includes('email')) result.email = msg;
            else if (lower.includes('username')) result.username = msg;
            else result.username = msg; // fallback to username field
        }
        return result;
    };

    return (
        <Auth
            title="Create an account"
            subtitle={
                <span>
                    Already have an account? <Link to="/login" style={{ color: '#7B61FF', textDecoration: 'none' }}>Log in</Link>
                </span>
            }
            submitLabel="Create account"
            fieldErrors={fieldErrors}
            extraFields={[
                <TextField
                    key="username"
                    type="text"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    error={!!fieldErrors.username}
                    helperText={fieldErrors.username}
                    sx={inputStyles}
                />
            ]}
            onSubmit={async ({ email, password }) => {
                if (!agreed) {
                    snackVar({ message: "You must agree to the Terms & Conditions", type: "error" });
                    return;
                }
                setFieldErrors({});
                try {
                    await createUser({
                        variables: {
                            createUserInput: { email, password, username },
                        },
                    });
                } catch (err) {
                    const allErrors = extractAllErrors(err);
                    if (allErrors.length > 0) {
                        setFieldErrors(routeErrors(allErrors));
                    } else {
                        snackVar({ message: UNKNOWN_ERROR_MESSAGE, type: 'error' });
                    }
                    return; // stop here, don't attempt login
                }
                // createUser succeeded — now log in
                const loginErr = await login({ email, password });
                if (loginErr) {
                    setFieldErrors({ password: loginErr });
                }
            }}
        >
            <FormControlLabel
                control={
                    <Checkbox
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        sx={{
                            color: '#555',
                            '&.Mui-checked': { color: '#7B61FF' }
                        }}
                    />
                }
                label={<span style={{ color: '#aaa', fontSize: '0.875rem' }}>I agree to the <span style={{ textDecoration: 'underline' }}>Terms & Conditions</span></span>}
                sx={{ mb: 1, ml: 0 }}
            />
        </Auth>
    )
}

export default SignUp
