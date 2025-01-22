import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../Components/Authanticatoin/Login";

import Register from "../Components/Authanticatoin/Register";
import Main from "../layout/Main";
import Dasboard from "../Components/Dashboard/Dasboard";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if token exists
  return token ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true, // Default route when visiting "/"
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dasboard/>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
