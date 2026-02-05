// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErpLogin from "./pages/ErpLogin";
import ErpLayout from "./erp/ErpLayout";
import ErpDashboard from "./erp/ErpDashboard";
import ViewAdmins from "./erp/ViewAdmins";
import CreateAdmin from "./erp/CreateAdmin";

import ErpProtectedRoute from "./ErpProtectedRoute/ErpProtectedRoute";
const router = createBrowserRouter([
  { path: "/", element: <ErpLogin /> },
  {
    path: "/app",
    element: (
      <ErpProtectedRoute>
        <ErpLayout />
      </ErpProtectedRoute>
    ),
    children: [
      { index: true, element: <ErpDashboard /> },
      { path: "admins", element: <ViewAdmins /> },
      { path: "create-admin", element: <CreateAdmin /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
