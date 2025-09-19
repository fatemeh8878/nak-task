import React from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import AddAttribute from "../pages/AddAttribute";
import AddProduct from "../pages/AddProduct";
import Attributes from "../pages/Attributes";
import Home from "../pages/Home";
import Products from "../pages/Products";

const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "attributes", element: <Attributes /> },
      { path: "attributes/add", element: <AddAttribute /> },
      { path: "products", element: <Products /> },
      { path: "products/add", element: <AddProduct /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

const AppRouter: React.FC = () => {
  return useRoutes(appRoutes);
};

export default AppRouter;
