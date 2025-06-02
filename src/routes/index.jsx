import AdminLayout from "../components/Admin/AdminLayout";
import Genre from "../pages/Admin/Genre";
import Song from "../pages/Admin/Song";
import UserLayout from "../components/User/UserLayout";
import HomePage from "../pages/User/HomePage";

export const adminRoutes = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "genre",
        element: <Genre />
      },
      {
        path: "song",
        element: <Song />
      }
    ]
  }
]


export const userRoutes = [
  {
    path: "/",
    element: <UserLayout/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      }
    ]
  }
]