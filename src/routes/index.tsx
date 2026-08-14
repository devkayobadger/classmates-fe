import { createBrowserRouter, Navigate } from "react-router-dom"

import MainLayout from "@/components/layout/main-layout"
import MinimalLayout from "@/components/layout/minimal-layout"

import Login from "@/pages/auth/login"
import ResetPassword from "@/pages/auth/reset-password"
import ForgotPassword from "@/pages/auth/forgot-password"

import PageNotFound from "@/pages/errors/page-not-found"
import ServerErrorPage from "@/pages/errors/internal-server-error"
import Unauthorized from "@/pages/errors/unauthorized"
import RouterErrorBoundary from "@/pages/errors/router-error"

import { privateRoutes } from "./route-config"
import PermissionGuard from "./permission-guard"
import GuestGuard from "./guest-guard"
import AuthGuard from "./auth-guard"

export const router = createBrowserRouter([
  {
    errorElement: <RouterErrorBoundary />,

    children: [
      {
        element: <GuestGuard />,
        children: [
          {
            element: <MinimalLayout />,
            children: [
              {
                path: "/login",
                element: <Login />,
              },
              {
                path: "/forgot-password",
                element: <ForgotPassword />,
              },
              {
                path: "/reset-password/:token",
                element: <ResetPassword />,
              },
            ],
          },
        ],
      },

      {
        element: <AuthGuard />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="/dashboard" replace />,
              },

              ...privateRoutes.map((route) => {
                const Component = route.element

                return {
                  path: route.path,
                  element: (
                    <PermissionGuard permission={route.permission}>
                      <Component />
                    </PermissionGuard>
                  ),
                }
              }),
            ],
          },
        ],
      },

      {
        path: "/401",
        element: <Unauthorized />,
      },

      {
        path: "/500",
        element: <ServerErrorPage />,
      },

      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
])