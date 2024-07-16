import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/LandingPage";
import React from "react";
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // next elements {},{},{},
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <React.StrictMode> // Delete until we finish development
      <RouterProvider router={router} />
    </React.StrictMode> // Delete until we finish development
  </AuthProvider>
  
);