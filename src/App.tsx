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
import PasswordRecovery from "./features/auth/PasswordRecovery";
import Members from "./pages/admin/members/Members";
import Projects from "./pages/admin/projects/Projets";
import Donation from "./pages/admin/donation/Donation";
import Testimonies from "./pages/admin/testimonies/Testimonies";
import Brochures from "./pages/admin/brochures/Brochures";
import Settings from "./pages/admin/settings/Settings";
import MembersDirector from "./pages/director/members/Members";
import ProjectsDirector from "./pages/director/projects/Projets";
import DonationDirector from "./pages/director/donation/Donation";
import TestimoniesDirector from "./pages/director/testimonies/Testimonies";
import BrochuresDirector from "./pages/director/brochures/Brochures";
import SettingsDirector from "./pages/director/settings/Settings";

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
          path: "/forget-password",
          element: <PasswordRecovery />,
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
              path: "/director/members",
              element: <MembersDirector />,
            },
            {
              path: "/director/projects",
              element: <ProjectsDirector />,
            },
            {
              path: "/director/donations",
              element: <DonationDirector />,
            },
            {
              path: "/director/stories",
              element: <TestimoniesDirector />,
            },
            {
              path: "/director/brochure-generator",
              element: <BrochuresDirector />,
            },
            {
              path: "/director/settings",
              element: <SettingsDirector />,
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
              path: "/admin/members",
              element: <Members />,
            },
            {
              path: "/admin/projects",
              element: <Projects />,
            },
            {
              path: "/admin/donations",
              element: <Donation />,
            },
            {
              path: "/admin/stories",
              element: <Testimonies />,
            },
            {
              path: "/admin/brochure-generator",
              element: <Brochures />,
            },
            {
              path: "/admin/settings",
              element: <Settings />,
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
