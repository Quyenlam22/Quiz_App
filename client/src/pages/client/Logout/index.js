import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../../actions/login";
import { message } from "antd";

function Logout () {
  Cookies.remove("id");
  Cookies.remove("fullName");
  Cookies.remove("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(checkLogin(false));
    api.success('Logout successfully!');
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