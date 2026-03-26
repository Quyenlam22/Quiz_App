import { Button, Flex, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../../services/usersService';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { AppContext } from '../../../Context/AppProvider';
import { AuthContext } from '../../../Context/AuthProvider';

function LoginAdmin() {
  const navigate = useNavigate();
  const { messageApi } = useContext(AppContext);
  const { handleLogin } = useContext(AuthContext);
  const [btnLoading, setBtnLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setBtnLoading(true);
      const response = await loginAdmin(values);

      if (response.code === 200) {
        // Lưu vào Cookie (Dùng chung tên với AuthProvider)
        Cookies.set('token', response.user.token, { expires: 1 });
        Cookies.set('id', response.user._id, { expires: 1 });
        Cookies.set('fullNameAdmin', response.user.fullName, { expires: 1 });

        // Cập nhật Context
        handleLogin();

        messageApi.success(`Chào Admin: ${response.user.fullName}`);
        setTimeout(() => navigate("/admin/dashboard"), 600);
      } else {
        messageApi.error(response.message || "Sai tài khoản hoặc mật khẩu!");
      }
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Flex vertical align='center' justify='center' style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ width: 400, padding: 40, background: '#fff', borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 30 }}>HỆ THỐNG QUẢN TRỊ</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input size="large" placeholder="admin@example.com" />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
            <Input.Password size="large" placeholder="******" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={btnLoading}>
            Đăng nhập
          </Button>
        </Form>
      </div>
    </Flex>
  );
}

export default LoginAdmin;