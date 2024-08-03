import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/CardsView";
import LoginPage from "./Pages/LoginPage";
import React from "react";
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "./context/AuthContext";
import { GlobalProvider } from "./context/GlobalContext";
import './index.css'
import ProtectedRoute from "./Components/ProtectedRoute";
import ProposalView from "./Pages/ProposalView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  },
  {
    path: "/ProposalView",
    element: <ProtectedRoute><ProposalView /></ProtectedRoute>
  },
  // next elements {},{},{},
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <GlobalProvider>
    <AuthProvider>
      <React.StrictMode>      
        <RouterProvider router={router} />
      </React.StrictMode>
    </AuthProvider>
  </GlobalProvider>
);