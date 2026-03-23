import LayoutClient from "../../layouts/LayoutClient";

import Login from "../../pages/client/Login";
import Register from "../../pages/client/Register";

import PrivateRouteClient from "../../components/PrivateRoutes/PrivateRouteClient";
import ForgotPassword from "../../pages/client/ForgotPassword";
import OtpPassword from "../../pages/client/ForgotPassword/OtpPassword";
import ResetPassword from "../../pages/client/ForgotPassword/ResetPassword";
// import  Error404 from "../../pages/Error404";
import { lazy } from "react";
import withSuspense from "../../utils/withSuspense";

const Home = lazy(() => import("../../pages/client/Home"));
const Topic = lazy(() => import("../../pages/client/Topic"));
const Answers = lazy(() => import("../../pages/client/Answers"));
const Quiz = lazy(() => import("../../pages/client/Quiz"));
const Result = lazy(() => import("../../pages/client/Result"));
const InfoUser = lazy(() => import("../../pages/client/InfoUser"));

export const routes = [
    {
        path: "/",
        element: <LayoutClient/>,
        children: [
            // {
            //     path: "*",
            //     element: <Error404/>,
            // },
            {
                path: "/",
                element: withSuspense(Home),
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
                element: <PrivateRouteClient/>,
                children: [
                    {
                        path: "/users/info",
                        element: withSuspense(InfoUser)
                    },
                    {
                        path: "/topics",
                        element: withSuspense(Topic),
                    },
                    {
                        path: "/answers",
                        element: withSuspense(Answers),
                    },
                    {
                        path: "/quiz/:slug",
                        element: withSuspense(Quiz),
                    },
                    {
                        path: "/result/:id",
                        element: withSuspense(Result),
                    }
                ]
            }
        ]
    }
];