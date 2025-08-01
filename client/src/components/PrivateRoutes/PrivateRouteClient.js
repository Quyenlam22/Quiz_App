import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { message } from "antd";
import { useEffect, useState } from "react";

function PrivateRouteClient() {
    const token = Cookies.get('token');
    const [messageApi, contextHolder] = message.useMessage();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!token) {
            messageApi.info('Please login to continue!');
            setTimeout(() => {
                setRedirect(true);
            }, 1000);

        }
    }, [messageApi, token]);

    return (
        <>
            {contextHolder}
            {token ? <Outlet/> : (redirect && <Navigate to={"/login"}/>)}
        </>
    )
}

export default PrivateRouteClient;