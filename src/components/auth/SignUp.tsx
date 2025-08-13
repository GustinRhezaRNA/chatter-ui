import { useState } from 'react'
import Auth from './Auth'
import { Link } from 'react-router-dom'
import { Link as MUILink } from '@mui/material'
import { useCreateUser } from '../../hooks/useCreateUser'
import { extractErrorMessage } from '../../utils/error'
import { useLogin } from '../../hooks/useLogin'
import { UNKNOWN_ERROR_MESSAGE } from '../../constants/errors'

const SignUp = () => {
    const [createUser] = useCreateUser()
    const [error, setError] = useState("");
    const { login } = useLogin()
    return (
        <>
            <Auth
                submitLabel="Signup"
                error={error}
                onSubmit={async ({ email, password }) => {
                    try {
                        await createUser({
                            variables: {
                                createUserInput: { email, password },
                            },
                        });
                        
                        await login({ email, password });
                        setError("");
                    } catch (err) {
                        const errorMessage = extractErrorMessage(err);
                        if (errorMessage) {
                            setError(errorMessage);
                            return;
                        }
                        setError(UNKNOWN_ERROR_MESSAGE);
                    }
                }}
            >
                <p className="text-center">
                    Already have an account?{" "}
                    <MUILink component={Link} to="/login">
                        Login
                    </MUILink>
                </p>
            </Auth>

        </>
    )
}

export default SignUp