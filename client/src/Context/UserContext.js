import { createContext, useState, useEffect, useCallback } from "react";
import { getUsers, deleteUser, deleteManyUsers } from "../services/usersService";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Thêm tham số silent để load ngầm (không hiện Spin nếu đã có dữ liệu)
  const refreshUsers = useCallback(async (params = "", silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await getUsers(params);
      if (res?.code === 200) {
        const data = res.data.map(item => ({ ...item, key: item._id }));
        setUsers(data);
      }
      return res;
    } catch (error) {
      console.error("Fetch Users Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeUser = useCallback(async (id) => {
    try {
      const res = await deleteUser(id);
      if (res?.code === 200) await refreshUsers("", true); // Xóa xong load lại ngầm
      return res;
    } catch (error) {
      return { code: 500, message: "Lỗi hệ thống!" };
    }
  }, [refreshUsers]);

  const removeManyUsers = useCallback(async (ids) => {
    try {
      const res = await deleteManyUsers(ids);
      if (res?.code === 200) await refreshUsers("", true);
      return res;
    } catch (error) {
      return { code: 500, message: "Lỗi hệ thống!" };
    }
  }, [refreshUsers]);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  return (
    <UserContext.Provider value={{ users, loading, refreshUsers, removeUser, removeManyUsers }}>
      {children}
    </UserContext.Provider>
  );
}