import React from 'react'
import Auth from './Auth'
import { Link } from 'react-router-dom'
import { Link as MUILink } from '@mui/material'
import { useCreateUser } from '../../hooks/useCreateUser'

const SignUp = () => {
    const [createUser] = useCreateUser()
    return (
        <>
            <Auth submitLabel={'Sign Up'} onSubmit={async ({ email, password }) => await createUser({
                variables: {
                    createUserInput: {
                        email,
                        password
                    }
                }
            })} >
                <p className='text-center'>
                    Already have an account?{' '}
                    <MUILink component={Link} to="/login">
                        Login
                    </MUILink>
                </p>
            </Auth >
        </>
    )
}

export default SignUp