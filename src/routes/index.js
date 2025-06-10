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
                        path: "/topics",
                        element: <Topic/>,
                    },
                    {
                        path: "/answers",
                        element: <Answers/>,
                    },
                    {
                        path: "/quiz",
                        element: <Quiz/>,
                    },
                    {
                        path: "/result",
                        element: <Result/>,
                    }
                ]
            }
        ]
    }
];