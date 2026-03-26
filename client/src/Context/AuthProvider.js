import { createContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { infoUser } from "../services/usersService";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = useCallback(() => {
    // 1. Danh sách các Cookies cần xóa
    const cookiesToRemove = ["token", "id", "admin_token", "admin_id", "fullNameAdmin", "fullName"];
    cookiesToRemove.forEach(c => Cookies.remove(c));

    // 2. Reset state user về null ngay lập tức
    setUser(null);
    setLoading(false);

    // 3. Nếu bạn muốn reset luôn cả danh sách tìm kiếm trong UserContext, 
    // bạn có thể dùng window.dispatchEvent hoặc nếu dùng chung 1 file Provider 
    // thì gọi hàm setUsers([]) tại đây.
  }, []);

  const checkAuth = useCallback(async () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("id");

    if (token && userId) {
      try {
        const res = await infoUser(userId);
        if (res && res.code === 200) {
          setUser(res.data);
        } else {
          handleLogout(); // Token hết hạn thì dọn dẹp luôn
        }
      } catch (error) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [handleLogout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = () => {
    setLoading(true); // Bật loading để checkAuth lấy data mới
    checkAuth();
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;