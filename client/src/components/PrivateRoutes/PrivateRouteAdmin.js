import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";
import { Flex, Spin } from "antd";

const PrivateRouteAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const { messageApi } = useContext(AppContext);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        messageApi.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
      } else if (user.role !== 'admin') {
        messageApi.error("Bạn không có quyền truy cập trang này!");
      }
    }
  }, [user, loading, messageApi]);

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ height: '100vh' }}>
        <Spin tip="Đang xác thực quyền Admin..." size="large" />
      </Flex>
    );
  }

  // Nếu không hợp lệ, đá về trang login ngay lập tức
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  // Hợp lệ thì cho vào Dashboard
  return <Outlet />; 
};

export default PrivateRouteAdmin;