import { createBrowserRouter } from 'react-router-dom'
import SignUp from './auth/SignUp.tsx'
import Login from './auth/Login.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
])

export default router

