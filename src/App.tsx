import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/not-found/NotFound";
import Home from "./pages/home/Home";
import Login from "./features/auth/Login";
import Registration from "./features/auth/Registration";
import AdminLayout from "./pages/layouts/AdminLayout";

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
          path: "/admin",
          element: <AdminLayout />,
          children: [
            {
              path: "/admin",
              element: <>Dashoard</>,
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
