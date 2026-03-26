import { createContext, useState, useEffect, useCallback } from "react";
import { getUsers, deleteUser, deleteManyUsers } from "../services/usersService";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshUsers = useCallback(async (params = "", silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await getUsers(params);
      if (res?.code === 200) {
        const data = res.data.map(item => ({ ...item, key: item._id }));
        setUsers(data);
      }
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔥 THÊM HÀM NÀY: Để xóa sạch dữ liệu khi đăng xuất
  const clearUsers = useCallback(() => {
    setUsers([]);
  }, []);

  const removeUser = useCallback(async (id) => {
    const res = await deleteUser(id);
    if (res?.code === 200) await refreshUsers("", true);
    return res;
  }, [refreshUsers]);

  const removeManyUsers = useCallback(async (ids) => {
    const res = await deleteManyUsers(ids);
    if (res?.code === 200) await refreshUsers("", true);
    return res;
  }, [refreshUsers]);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  return (
    <UserContext.Provider value={{ users, loading, refreshUsers, removeUser, removeManyUsers, clearUsers }}>
      {children}
    </UserContext.Provider>
  );
}