import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { UserContext } from '../../Context/UserContext'; // 🔥 Import thêm

function LogoutAdmin() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const { clearUsers } = useContext(UserContext); // 🔥 Lấy hàm clear dữ liệu

  const onLogout = () => {
    // 1. Xóa sạch dữ liệu trong các Context
    handleLogout(); 
    clearUsers(); // 🔥 Xóa danh sách users cũ
    
    // 3. Chuyển hướng
    navigate('/admin/login', { replace: true });
  };

  return (
    <Button 
      color="danger"
      variant="text"
      icon={<LogoutOutlined />} 
      onClick={onLogout}
      style={{ width: '100%' }}
    >
      Đăng xuất
    </Button>
  );
}

export default LogoutAdmin;