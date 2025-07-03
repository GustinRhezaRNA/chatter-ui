import Auth from './Auth'
import { Link } from 'react-router-dom'
import { Link as MUILink } from '@mui/material'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
    const { login, error } = useLogin()

    return (
        <>
            <Auth submitLabel={'Login'} onSubmit={async (request) => { login(request) }} error={
                error ? 'Credentials is not valid' : ""
            } >
                <p className='text-center'>
                    Do not have an account?{' '}
                    <MUILink component={Link} to="/signup">
                        Sign Up
                    </MUILink>
                </p>

            </Auth >
        </>
    )
}

export default Login