import AdminLayout from "../components/Admin/AdminLayout";
import Genre from "../pages/Admin/Genre";
import Song from "../pages/Admin/Song";
import UserLayout from "../components/User/UserLayout";
import HomePage from "../pages/User/HomePage";
import Login from "@/pages/User/Login";
import AdminLogin from "@/pages/Admin/AdminLogin";
import { useRoutes } from "react-router-dom";
import SongDetail from "@/pages/User/SongDetail";
import Playlist from "@/pages/User/Playlist";
import PlaylistDetail from "@/pages/User/Playlist/PlaylistDetail";
import LikedSong from "@/pages/User/LikedSong";
import TopHit from "@/pages/User/TopHit";
import Profile from "@/pages/User/Profile";
import ProfileUser from "@/pages/User/ProfileUser";
import NotFound from "@/pages/Error/404NotFound";
import ArtistLayout from "@/components/Artist/Layout";
import ArtistAlbum from "@/pages/Artist/Album";
import ArtistSong from "@/pages/Artist/Song";
import Overview from "@/pages/Artist/Overview";

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
        },
        {
          path: 'listen',
          element: <SongDetail />
        },
        {
          path: 'playlist',
          element: <Playlist />,
        },
        {
          path: 'playlist/:slug',
          element: <PlaylistDetail />
        },
        {
          path: 'liked-song',
          element: <LikedSong />
        },
        {
          path: 'top-hit',
          element: <TopHit />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'profile/:id',
          element: <ProfileUser />
        }
      ]
    },
    {
      path: "/studio",
      element: <ArtistLayout/>,
      children: [
        {
          index: true,
          element: <Overview />
        },
        {
          path: "album",
          element: <ArtistAlbum />
        },
        {
          path: "song",
          element: <ArtistSong />
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
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routes
}
