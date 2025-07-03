import React from 'react'
import Auth from './Auth'
import { Link } from 'react-router-dom'
import { Link as MUILink } from '@mui/material'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
    const {login, error} = useLogin()

    return (
        <>
            <Auth submitLabel={'Login'} onSubmit={async (request) => { login(request)}} >
                <p className='text-center'>
                    Do not have an account?{' '}
                    <MUILink component={Link} to="/signup">
                        Sign Up
                    </MUILink>
                </p>
                {error && <p className='text-red-500 text-center'>Login failed. Please try again.</p>}
            </Auth>
        </>
    )
}

export default Login