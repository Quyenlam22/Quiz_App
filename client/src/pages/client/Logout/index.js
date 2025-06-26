import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../../actions/login";
import { notification } from "antd";

function Logout () {
  Cookies.remove("id");
  Cookies.remove("fullName");
  Cookies.remove("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    dispatch(checkLogin(false));
    api['success']({
      message: 'Logout successfully!',
      duration: 1.5,
    });
    setTimeout(() => {
      navigate("/login");
    }, 500)
  }, [api, dispatch, navigate])

  return (
    <>
      {contextHolder}
      {/* <Navigate to={"/login"}/> */}
    </>
  )
}

export default Logout;