import LayoutClient from "../../layouts/LayoutClient";
import Home from "../../pages/client/Home";
import Topic from "../../pages/client/Topic";
import Answers from "../../pages/client/Answers";
import Login from "../../pages/client/Login";
import Register from "../../pages/client/Register";
import Quiz from "../../pages/client/Quiz";
import Result from "../../pages/client/Result";
import PrivateRouteClient from "../../components/PrivateRoutes/PrivateRouteClient";
import Logout from "../../pages/client/Logout";
import ForgotPassword from "../../pages/client/ForgotPassword";
import OtpPassword from "../../pages/client/ForgotPassword/OtpPassword";
import ResetPassword from "../../pages/client/ForgotPassword/ResetPassword";
import InfoUser from "../../pages/client/InfoUser";

export const routes = [
    {
        path: "/",
        element: <LayoutClient/>,
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
                element: <PrivateRouteClient/>,
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
                        path: "/quiz/:slug",
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