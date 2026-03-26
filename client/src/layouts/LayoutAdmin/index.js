import { Button, Dropdown, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import './LayoutAdmin.scss';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from "react";
import MenuSider from "../../components/MenuSider";
import { NavLink, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import LogoutAdmin from "../../components/Logout/LogoutAdmin";

function LayoutAdmin () {
    const [collapse, setCollapse] = useState(false);
    const fullName = Cookies.get('fullNameAdmin') || "";

    const login = [
        {
            key: "userinfo",
            label: <NavLink to="user-info">
                <Button
                    icon={<UserOutlined />}
                    color="primary"
                    variant="text"
                    style={{ width: '100%' }}    
                >
                    Thông tin tài khoản
                </Button>
            </NavLink>
        },
        {
            key: "logout",
            label: <LogoutAdmin/>
        }
    ]

    return (
        <>
            <Layout className="layout-default">
                <header className="header-admin">
                    <div className={"header-admin__logo " + (collapse && "header-admin__logo--collapse")}>
                        <div className="header-admin__logo__image">
                            {/* <img src={logo} alt="Logo"/> */}
                            <h4>Edu Quiz</h4>
                        </div>
                    </div>
                    <div className="header-admin__nav">
                        <div className="header-admin__nav-left">
                            <div className="header-admin__collapse" onClick={() => setCollapse(!collapse)}>
                                {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            </div>
                        </div>
                        <div className="header-admin__nav-right">
                            <div className="header-admin__nav-right__auth">
                                <Dropdown menu={{ items:login }} placement="bottom">
                                    <Button>{fullName ? fullName : <UserOutlined />}</Button>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>
                <Layout>
                    <Sider theme={"light"} className="sider" collapsed={collapse}>
                        <MenuSider/>
                    </Sider>
                    <Content className="content-admin">
                        <Outlet/>
                    </Content>
                </Layout>
                {/* <Footer>Footer</Footer> */}
            </Layout>
        </>
    )
}

export default LayoutAdmin;