import { createBrowserRouter } from 'react-router-dom'
import SignUp from './auth/SignUp.tsx'
import Login from './auth/Login.tsx'
import Home from './home/Home.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
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

