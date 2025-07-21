import type React from "react";
import { useGetMe } from "../../hooks/useGetMe"
import excludedRoutes from "../../constants/excluded-routes";
import { use, useEffect } from "react";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";

interface GuardProps {
    children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
    //useGetMe() tidak langsung return user, tapi data.me
    const { data: user, error } = useGetMe()
    useEffect(() => {
        if (user) {
            authenticatedVar(true);
        }
    }, [user]);

    useEffect(() => {
        if (error) {
            if (error.networkError) {
                snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
            }
        }
    }, [error]);

    console.log(user);
    return <>
        {
            excludedRoutes.includes(window.location.pathname) ? children : user && children
        }
    </>;
}

export { Guard };