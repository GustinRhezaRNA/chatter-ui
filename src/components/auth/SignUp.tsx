import React, { useState } from 'react'
import Auth from './Auth'
import { Link } from 'react-router-dom'
import { Link as MUILink } from '@mui/material'
import { useCreateUser } from '../../hooks/useCreateUser'
import { extractErrorMessage } from '../../utils/error'

const SignUp = () => {
    const [createUser] = useCreateUser()
    const [error, setError] = useState("");
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
                        setError("");
                    } catch (err) {
                        const errorMessage = extractErrorMessage(err);
                        if (errorMessage) {
                            setError(errorMessage);
                            return;
                        }
                        setError("Unknown error occurred while creating user");
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