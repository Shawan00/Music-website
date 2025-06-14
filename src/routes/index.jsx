import AdminLayout from "../components/Admin/AdminLayout";
import Genre from "../pages/Admin/Genre";
import Song from "../pages/Admin/Song";
import UserLayout from "../components/User/UserLayout";
import HomePage from "../pages/User/HomePage";
import Login from "@/pages/User/Login";
import AdminLogin from "@/pages/Admin/AdminLogin";
import { useRoutes } from "react-router-dom";

export const AllRoutes = () => {
  const routes = useRoutes([
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'admin/login',
      element: <AdminLogin />
    },
    {
      path: '/',
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        }
      ]
    },
    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        {
          path: 'song',
          element: <Song />
        },
        {
          path: 'genre',
          element: <Genre />
        }
      ]
    }
  ])

  return routes
}
