import type React from "react";
import { useGetMe } from "../../hooks/useGetMe"
import excludedRoutes from "../../constants/excluded-routes";

interface GuardProps {
    children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
    //useGetMe() tidak langsung return user, tapi data.me
    const { data: user } = useGetMe()

    console.log(user);
    return <>
        {
            excludedRoutes.includes(window.location.pathname) ? children : user && children
        }
    </>;
}

export { Guard };