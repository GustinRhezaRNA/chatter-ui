import type React from "react";
import { useGetMe } from "../../hooks/useGetMe"
import excludedRoutes from "../../constants/excluded-routes";
import { useEffect } from "react";
import router from "../Routes";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { usePath } from "../../hooks/usePath";

interface GuardProps {
    children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
    const { data: user, error } = useGetMe()
    const { path } = usePath();

    useEffect(() => {
        // If on the root path and we've determined user is not authenticated, redirect to login
        if (path === '/' && !user && error) {
            router.navigate('/login', { replace: true });
        }
    }, [path, user, error]);

    useEffect(() => {
        if (user) {
            authenticatedVar(true);
        }
    }, [user]);

    useEffect(() => {
        if (error) {
            const isAuthError = error.graphQLErrors?.some(
                (e) => e.extensions?.code === 'UNAUTHENTICATED' ||
                    (e.extensions?.originalError as any)?.statusCode === 401
            );
            const isNetworkError = !!error.networkError;

            if (isAuthError) {
                // Only show "session expired" if the user was actually logged in.
                // After a deliberate logout, authenticatedVar is already false — skip the snack.
                if (authenticatedVar()) {
                    authenticatedVar(false);
                    snackVar({ message: 'Session expired, please log in again', type: 'warning' });
                }
            } else if (isNetworkError) {
                snackVar({ message: 'Connection error, please try again', type: 'error' });
            }
        }
    }, [error]);

    return <>
        {
            excludedRoutes.includes(path) ? children : user && children
        }
    </>;
}

export { Guard };