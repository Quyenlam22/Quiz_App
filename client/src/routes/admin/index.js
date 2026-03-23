import { lazy } from "react";
import withSuspense from "../../utils/withSuspense";

// LAYOUTS
import LayoutAdmin from "../../layouts/LayoutAdmin/index";

const DashBoard = lazy(() => import("../../pages/admin/Dashboard"));
const UserManagement = lazy(() => import("../../pages/admin/UserManagement"));
const TopicManagement = lazy(() => import("../../pages/admin/TopicManagement"));
const LoginAdmin = lazy(() => import("../../pages/admin/LoginAdmin/index"));
// const Setting = lazy(() => import("../../pages/admin/Setting"));

export const routesAdmin = [
  // {
  //   element: <PrivateRouteAdmin/>,
  //   children: [
      {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
          {
            path: "dashboard",
            element: withSuspense(DashBoard),
          },
          {
            index: true,
            element: withSuspense(DashBoard),
          },
          {
            path: "topic-management",
            element: withSuspense(TopicManagement),
          },
          {
            path: "user-management",
            element: withSuspense(UserManagement),
          },
          // {
          //   path: "settings",
          //   element: withSuspense(Setting),
          // },
        ]
      },
  //   ]
  // },
  {
    path: "admin/login",
    element: withSuspense(LoginAdmin),
  }
];