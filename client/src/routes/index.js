import LayoutDefault from "../layouts/LayoutDefault";
import Home from "../pages/Home";
import Topic from "../pages/Topic";
import Answers from "../pages/Answers";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import PrivateRoutes from "../components/PrivateRoutes/index";
import Logout from "../pages/Logout";
import ForgotPassword from "../pages/ForgotPassword";
import OtpPassword from "../pages/ForgotPassword/OtpPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import InfoUser from "../pages/InfoUser";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/user",
                children: [
                    {
                        path: "forgot-password",
                        element: <ForgotPassword/>
                    },
                    {
                        path: "otp-password",
                        element: <OtpPassword/>
                    },
                    {
                        path: "reset-password",
                        element: <ResetPassword/>
                    }
                ]
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/logout",
                element: <Logout/>,
            },
            {
                element: <PrivateRoutes/>,
                children: [
                    {
                        path: "/users/info",
                        element: <InfoUser/>
                    },
                    {
                        path: "/topics",
                        element: <Topic/>,
                    },
                    {
                        path: "/answers",
                        element: <Answers/>,
                    },
                    {
                        path: "/quiz/:id",
                        element: <Quiz/>,
                    },
                    {
                        path: "/result/:id",
                        element: <Result/>,
                    }
                ]
            }
        ]
    }
];