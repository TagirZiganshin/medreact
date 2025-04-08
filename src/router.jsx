import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./components/UserLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import UserForm from "./views/UserForm.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Admin from "./views/Admin.jsx";
import Home from "./views/Home.jsx";
import ChatAi from "./views/ChatAi.jsx";
import Posts from "./views/Posts.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import PostDetail from "./views/PostDetail.jsx";
import PostWidgetDetail from "./views/PostWidgetDetail.jsx";
import Header from "./components/Header.jsx";
import About from "./views/About.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <GuestLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/",
            element: <UserLayout />,
            children: [
              {
                path: "/user",
                element: <UserForm />,
              },
            ],
          },
          {
            path: "/",
            element: <AdminLayout />,
            children: [
              {
                path: "/admin",
                element: <Admin />,
              },
            ],
          },
          {
            path: "/post/:id",
            element: <PostDetail />,
          },
        ],
      },

      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/new/:id",
        element: <PostWidgetDetail />,
      },
      {
        path: "/chatai",
        element: <ChatAi />,
      },
    ],
  },
]);
export default router;
