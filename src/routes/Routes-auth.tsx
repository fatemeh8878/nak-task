import React from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const appRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
];

const AuthAppRouter: React.FC = () => {
  return useRoutes(appRoutes);
};

export default AuthAppRouter;
