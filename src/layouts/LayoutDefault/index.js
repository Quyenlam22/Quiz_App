import { NavLink, Outlet } from "react-router-dom";
import './LayoutDefault.scss';
import { Button } from 'antd'
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";

function LayoutDefault () {
    const token = Cookies.get("token");
    const isLogin = useSelector(state => state.loginReducer);

    const navLinkActive = (e) => {
        return e.isActive ? "menu__link menu__link--active" : "menu__link";
    }

    return (
        <>
            <div className="layout-default">
                <header className="layout-default__header">
                    <div className="layout-default__logo">
                        {/* <NavLink to="/" >
                            <img src="/logo_shop.png" alt="Logo" />
                        </NavLink> */}
                        <h3>Quiz</h3>
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
                                <Button className="mr-5">
                                    <NavLink to="/info-user">{Cookies.get("fullName")}</NavLink>
                                </Button>
                                <Button>
                                    <NavLink to="/logout">Đăng xuất</NavLink>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button className="mr-5">
                                    <NavLink to="/login">Đăng nhập</NavLink>
                                </Button>
                                <Button>
                                    <NavLink to="/register">Đăng ký</NavLink>
                                </Button>
                            </>
                        )}
                    </div>
                </header> 
                <main className="layout-default__main">
                    <Outlet/>
                </main>
                <footer className="layout-default__footer">
                    Copyright @ 2025 by Quyenn22 
                </footer>
            </div>
        </>
    );
}

export default LayoutDefault;