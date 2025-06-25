import React from 'react'
import Auth from './Auth'
import { Link } from 'react-router-dom'
import { Link as MUILink } from '@mui/material'

const Login = () => {
    return (
        <>
            <Auth submitLabel={'Login'} onSubmit={async () => { }} >
                <p className='text-center'>Do not have an account? <Link to={'/signup'}> <MUILink>Sign Up</MUILink></Link></p>
            </Auth>
        </>
    )
}

export default Login