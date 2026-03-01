import Auth from './Auth'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
    const { login, error } = useLogin()

    return (
        <Auth
            title="Log in to your account"
            subtitle={
                <span>
                    Don't have an account? <Link to="/signup" style={{ color: '#7B61FF', textDecoration: 'none' }}>Sign up</Link>
                </span>
            }
            submitLabel="Log in"
            onSubmit={async (request) => { await login(request) }}
            error={error}
        />
    )
}

export default Login