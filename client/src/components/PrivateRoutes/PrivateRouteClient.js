import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

function PrivateRouteClient() {
    const token = Cookies.get('token');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!token) {
            localStorage.setItem("isPrivate", true);
            setRedirect(true);
        }
    }, [token]);

    return (
        <>
            {token ? <Outlet/> : (redirect && <Navigate to={"/login"}/>)}
        </>
    )
}

export default PrivateRouteClient;