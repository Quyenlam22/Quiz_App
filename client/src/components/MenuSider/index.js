import { Menu } from "antd";
import { DashboardOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaUserSecret } from "react-icons/fa";

function MenuSider () {
    const location = useLocation();
    const path = location.pathname;
    
    const items = [
        {
            key: '/admin/dashboard',
            icon: <DashboardOutlined />,
            label: <Link to={"/admin/dashboard"}>Dash board</Link>
        },
        {
            key: '/admin/topic-management',
            icon: <FaUserSecret />,
            label: <Link to={"/admin/topic-management"}>Quản lý chủ đề</Link>,
        },
        {
            key: '/admin/question-management',
            icon: <FaUser />,
            label: <Link to={"/admin/question-management"}>Quản lý câu hỏi</Link>,
        },
        {
            key: '/admin/user-management',
            icon: <FaUser />,
            label: <Link to={"/admin/user-management"}>Quản lý tài khoản</Link>,
        },
        // {
        //     key: '/admin/settings',
        //     icon: <SettingOutlined />,
        //     label: <Link to={"/admin/settings"}>Cài đặt chung</Link>,
        // },
    ];

    return (
        <>
            <Menu
                // defaultOpenKeys={["/admin/dashboard"]}
                defaultSelectedKeys={[path]}
                mode="inline"
                items={items}
            />
        </>
    )
}

export default MenuSider;