import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../actions/login";

function Logout () {
  Cookies.remove("fullName");
  Cookies.remove("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin(false));
    navigate('/login');
  }, [])
  return (
    <>
      {/* <Navigate to={"/login"}/> */}
    </>
  )
}

export default Logout;