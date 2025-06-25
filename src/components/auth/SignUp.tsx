import React from 'react'
import Auth from './Auth'
import { Link } from 'react-router-dom'
import { Link as MUILink } from '@mui/material'

const SignUp = () => {
    return (
        <>
            <Auth submitLabel={'Sign Up'} onSubmit={async () => { }} >
                <p className='text-center'>Already have an account? <Link to={'/login'}> <MUILink>Login</MUILink></Link></p>
            </Auth>
        </>
    )
}

export default SignUp