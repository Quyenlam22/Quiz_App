import { NavLink, Outlet, useNavigate } from "react-router-dom";
import './LayoutClient.scss';
import { Button, Layout, message } from 'antd'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkLogin } from "../../actions/login";
import FooterComponent from "../../components/FooterComponent";
import Chatbot from "../../components/Chatbot";

function LayoutClient () {
    const [token, setToken] = useState();
    const login = useSelector(state => state.loginReducer);
    const navigate = useNavigate();
    const [api, contextHolder] = message.useMessage();
    const dispatch = useDispatch();

    const fullName = Cookies.get("fullName");

    useEffect(() => {
        const isLogout = localStorage.getItem("isLogout");
        const isRegister = localStorage.getItem("isRegister");
        const isPrivate = localStorage.getItem("isPrivate");
        const isLogin = localStorage.getItem("isLogin");

        if(!login && isLogout === "true") {
            localStorage.setItem("isLogout", false);
            api.open({
                type: "success",
                duration: 1,
                content: "Logout successfully!"
            });
                ;
        }

        if(login && isLogin === "true") {
            localStorage.setItem("isLogin", false);
            api.open({
                type: "success",
                duration: 1,
                content: `Hello ${fullName}!`
            });
                ;
        }
        
        if(isRegister === "true") {
            api.open({
                type: "success",
                duration: 1,
                content: "Register successfully!"
            });
                ;
            localStorage.setItem("isRegister", false);
        }

        if(isPrivate === "true") {
            api.open({
                type: "info",
                duration: 1,
                content: "Please login to continue!"
            });
                ;
            localStorage.setItem("isPrivate", false);
        }
        
        setToken(Cookies.get("token"));
    }, [login, api, navigate, fullName])

    const navLinkActive = (e) => {
        return e.isActive ? "menu__link menu__link--active" : "menu__link";
    }

    const handleLogout = () => {
        localStorage.setItem("isLogout", true);
        Cookies.remove("id");
        Cookies.remove("fullName");
        Cookies.remove("token");
        dispatch(checkLogin(false));
    }

    return (
        <>
            {contextHolder}
            <Layout>
                <div className="layout-default">
                    <header className="layout-default__header">
                        <div className="layout-default__logo">
                            <NavLink to="/" >
                                <img src='/logo_app.png' alt="Logo" />
                            </NavLink>
                        </div>
                        <div className="menu">
                            <ul>
                                <li>
                                    <NavLink to="/" className={navLinkActive}>
                                        Home
                                    </NavLink>
                                </li>
                                {token && (
                                    <>
                                        <li>
                                            <NavLink to="/topics" className={navLinkActive}>
                                                Topic
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/answers" className={navLinkActive}>
                                                Answers
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>    
                        </div>
                        <div className="layout-default__account">
                            {token ? (
                                <>
                                    <Button className="mr-5 button__auth">
                                        <NavLink to="/users/info">{fullName}</NavLink>
                                    </Button>
                                    <Button className="button__auth">
                                        <NavLink to="/login" onClick={handleLogout}>Đăng xuất</NavLink>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button className="mr-5 button__auth">
                                        <NavLink to="/login">Đăng nhập</NavLink>
                                    </Button>
                                    <Button className="button__auth">
                                        <NavLink to="/register">Đăng ký</NavLink>
                                    </Button>
                                </>
                            )}
                        </div>
                    </header> 
                    <main className="layout-default__main">
                        <Outlet/>
                    </main>
                    <FooterComponent/>
                    <Chatbot/>
                </div>
            </Layout>
        </>
    );
}

export default LayoutClient;