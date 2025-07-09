import type React from "react";
import { useGetMe } from "../../hooks/useGetMe"
import excludedRoutes from "../../constants/excluded-routes";
import { useEffect } from "react";
import { authenticatedVar } from "../../constants/authenticated";

interface GuardProps {
    children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
    //useGetMe() tidak langsung return user, tapi data.me
    const { data: user } = useGetMe()
    useEffect(() => {
        if (user) {
            authenticatedVar(true);
        }
    }, [user]);

    console.log(user);
    return <>
        {
            excludedRoutes.includes(window.location.pathname) ? children : user && children
        }
    </>;
}

export { Guard };