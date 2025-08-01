import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import './LayoutClient.scss';
import { Button, Dropdown, Flex, Layout, Modal, QRCode } from 'antd'
import Cookies from 'js-cookie';
import { BankOutlined, ClockCircleOutlined, CreditCardOutlined, EnvironmentOutlined, FacebookOutlined, IdcardOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, PinterestOutlined, TwitterOutlined, UserOutlined } from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function LayoutClient () {
    const [token, setToken] = useState();
    const isLogin = useSelector(state => state.loginReducer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        setToken(Cookies.get("token"));
    }, [isLogin])

    const navLinkActive = (e) => {
        return e.isActive ? "menu__link menu__link--active" : "menu__link";
    }

    const login = [
        {
            key: "users/info",
            label: <span onClick={() => navigate("/users/info")}>Account information</span>
        },
        {
            key: "logout",
            label: <span onClick={() => navigate("/logout")}>Logout</span>
        }
    ]

    const unLogin = [
        {
            key: "login",
            label: <span onClick={() => navigate("/login")}>Login</span>
        },
        {
            key: "register",
            label: <span onClick={() => navigate("/register")}>Register</span>
        }
    ]

    return (
        <>
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
                                        <NavLink to="/users/info">{Cookies.get("fullName")}</NavLink>
                                    </Button>
                                    <Button className="button__auth">
                                        <NavLink to="/logout">Đăng xuất</NavLink>
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
                        <div className="layout-default__sub-account">
                            <Dropdown menu={{ items: token ? login : unLogin }} placement="bottom">
                                <Button className="button__auth">{Cookies.get("fullName") ? Cookies.get("fullName") : <UserOutlined />}</Button>
                            </Dropdown>
                        </div>
                    </header> 
                    <main className="layout-default__main">
                        <Outlet/>
                    </main>
                    <Footer className="footer">
                        <div className="footer__main">
                            <Flex justify="space-between" gap={'middle'}>
                                <div className="footer__box">
                                    <h3 className="footer__box__title">Edu Quiz</h3>
                                    <div className="footer__box__content">
                                        <p>Your top destination for programming knowledge.</p>
                                        <div className="footer__box__icons">
                                            <Link className="footer__box__icon" onClick={showModal}><FacebookOutlined /></Link>
                                            <Link className="footer__box__icon"><TwitterOutlined /></Link>
                                            <Link className="footer__box__icon"><InstagramOutlined /></Link>
                                            <Link className="footer__box__icon"><PinterestOutlined /></Link>
                                            <Modal
                                                open={isModalOpen}
                                                closable={false}
                                                footer={null}
                                                onCancel={handleCancel}
                                            >
                                                <Flex justify="center">
                                                    <QRCode size={300} type="canvas" value="https://www.facebook.com/daoquyen220704" />
                                                </Flex>
                                            </Modal>
                                        </div>
                                    </div>    
                                </div>
                                <div className="footer__box">
                                    <h3 className="footer__box__title">Explore</h3>
                                    <ul className="footer__box__content">
                                        <li><Link to="/" className="footer__box__desc">New Quiz</Link></li>
                                        <li><Link to="/" className="footer__box__desc">List Quizzes</Link></li>
                                        <li><Link to="/" className="footer__box__desc">Current trends</Link></li>
                                        <li><Link to="/" className="footer__box__desc">Programming Club</Link></li>
                                    </ul>
                                </div>
                                <div className="footer__box">
                                    <h3 className="footer__box__title">Customer Service</h3>
                                    <ul className="footer__box__content">
                                        <li><Link to="/" className="footer__box__desc">Contact Us</Link></li>
                                        <li><Link to="/" className="footer__box__desc">FAQs</Link></li>
                                        <li><Link to="/" className="footer__box__desc">Tutorials</Link></li>
                                        <li><Link to="/" className="footer__box__desc">Privacy Policy</Link></li>
                                    </ul>
                                </div>
                                <div className="footer__box">
                                    <h3 className="footer__box__title">Contact Us</h3>
                                    <ul className="footer__box__content">
                                        <li className="flex items-start">
                                            <EnvironmentOutlined className="mr-1" />
                                            <span className="text-gray-400"> Ha Noi, Viet Nam</span>
                                        </li>
                                        <li className="flex items-center">
                                            <PhoneOutlined className="mr-1" />
                                            <span className="text-gray-400"> 0358374096</span>
                                        </li>
                                        <li className="flex items-center">
                                            <MailOutlined className="mr-1" />
                                            <span className="text-gray-400"> ledaoquyen10a5@gmail.com</span>
                                        </li>
                                        <li className="flex items-center">
                                            <ClockCircleOutlined className="mr-1" />
                                            <span className="text-gray-400"> Mon-Fri: 9AM-6PM</span>
                                        </li>
                                    </ul>
                                </div>
                            </Flex>
                        </div>
                        <hr/>

                        <Flex justify="space-between" align="center">
                            <div className="footer__copyright__content">
                                Copyright ©{new Date().getFullYear()} Created by Quyenn22
                            </div>
                            <Flex align="center" justify="space-between">
                                <Link to="/" className="footer__copyright__terms">Privacy Policy</Link>
                                <Link to="/" className="footer__copyright__terms">Terms of Service</Link>
                                <div className="footer__copyright__icons">
                                    <Link className="footer__box__icon"><CreditCardOutlined /></Link>
                                    <Link className="footer__box__icon"><BankOutlined /></Link>
                                    <Link className="footer__box__icon"><IdcardOutlined /></Link>
                                </div>
                            </Flex>
                        </Flex>
                    </Footer>
                </div>
            </Layout>
        </>
    );
}

export default LayoutClient;