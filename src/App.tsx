import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/not-found/NotFound";
import Home from "./pages/visitors/Home";
import Login from "./features/auth/Login";
import Registration from "./features/auth/Registration";
import AdminLayout from "./pages/layouts/AdminLayout";
import Dashboard from "./pages/members/dashboard/Dashboard";
import DirectorLayout from "./pages/layouts/DirectorLayout";
import DirectorDashboard from "./pages/director/dashboard/Dashboard";
import AdminDashboard from "./pages/admin/dashboard/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/registration",
          element: <Registration />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/projects",
          element: <Registration />,
        },
        {
          path: "/testimonies ",
          element: <Registration />,
        },
        {
          path: "/profile",
          element: <Registration />,
        },
        {
          path: "/director",
          element: <DirectorLayout />,
          children: [
            {
              path: "/director",
              element: <DirectorDashboard />,
            },
            {
              path: "/director/users",
              element: <>users</>,
            },
            {
              path: "/director/projects",
              element: <>projects</>,
            },
            {
              path: "/director/donations",
              element: <>donations</>,
            },
            {
              path: "/director/stories",
              element: <>stories</>,
            },
            {
              path: "/director/brochure-generator",
              element: <>brochure-generator</>,
            },
            {
              path: "/director/settings",
              element: <>settings</>,
            },
          ],
        },
        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            {
              path: "/admin",
              element: <AdminDashboard />,
            },
            {
              path: "/admin/users",
              element: <>users</>,
            },
            {
              path: "/admin/projects",
              element: <>projects</>,
            },
            {
              path: "/admin/donations",
              element: <>donations</>,
            },
            {
              path: "/admin/stories",
              element: <>stories</>,
            },
            {
              path: "/admin/brochure-generator",
              element: <>brochure-generator</>,
            },
            {
              path: "/admin/settings",
              element: <>settings</>,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
