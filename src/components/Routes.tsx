import { createBrowserRouter } from 'react-router-dom'
import SignUp from './auth/SignUp.tsx'
import Login from './auth/Login.tsx'
import Chat from './chat/Chat.tsx'
import Profile from './profile/Profile.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <></>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: "/chats/:_id",
        element: <Chat />,
    },
    {
        path: "/profile",
        element: <Profile />,
    }
])

export default router

