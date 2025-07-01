import React from 'react'
import Auth from './Auth'
import { Link } from 'react-router-dom'
import { Link as MUILink } from '@mui/material'

const Login = () => {
    return (
        <>
            <Auth submitLabel={'Login'} onSubmit={async () => { }} >
                <p className='text-center'>
                    Do not have an account?{' '}
                    <MUILink component={Link} to="/signup">
                        Sign Up
                    </MUILink>
                </p>
            </Auth>
        </>
    )
}

export default Login