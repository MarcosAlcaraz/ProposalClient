import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import React from "react";
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "./context/AuthContext";
import { GlobalProvider } from "./context/GlobalContext";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <LoginPage/>,
  },
  // next elements {},{},{},
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <GlobalProvider>
    <AuthProvider>
      <React.StrictMode> // Delete until we finish development
        <RouterProvider router={router} />
      </React.StrictMode> // Delete until we finish development
    </AuthProvider>
  </GlobalProvider>
);