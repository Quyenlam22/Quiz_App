import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setLogin(true);
    }
  }, []);

  const handleLogin = () => {
    setLogin(true);
  };

  const handleLogout = () => {
    Cookies.remove("id");
    Cookies.remove("fullName");
    Cookies.remove("token");
    setLogin(false);
  };

  return (
    <AuthContext.Provider value={{
      login,
      handleLogin,
      handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;