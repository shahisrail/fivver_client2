/* eslint-disable react/prop-types */
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../Components/Authanticatoin/Login";
import Register from "../Components/Authanticatoin/Register";
import SidebarLayout from "../layout/DahboradLayout";
import Dasboard from "../Components/Dashboard/Dasboard";
import AddExpense from "../Components/Dashboard/AddExpense";
import ViewExpenses from "../Components/Dashboard/ViewExpenses";
import ViewGraphs from "../Components/Dashboard/ViewGraphs";
import SavingsSection from "../Components/Dashboard/AddSavings";
import Profile from "../Components/Dashboard/profile";

// Protected Route Component
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if token exists
  return token ? children : <Navigate to="/login" replace />;
};
// Redirect if already logged in (for login and register pages)
const RedirectIfLoggedIn = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children; // Redirect to dashboard if logged in
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Navigate
        to={localStorage.getItem("token") ? "/dashboard" : "/login"}
        replace
      />
    ),
  },
  {
    path: "/login",
    element: (
      <RedirectIfLoggedIn>
        <Login />
      </RedirectIfLoggedIn>
    ),
  },
  {
    path: "/register",
    element: (
      <RedirectIfLoggedIn>
        <Register />
      </RedirectIfLoggedIn>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dasboard />,
      },
      {
        path: "add-expense",
        element: (
          <ProtectedRoute>
            <AddExpense />
          </ProtectedRoute>
        ),
      },
      {
        path: "view-expenses",
        element: (
          <ProtectedRoute>
            <ViewExpenses />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-savings",
        element: (
          <ProtectedRoute>
            <SavingsSection />
          </ProtectedRoute>
        ),
      },
      {
        path: "view-graphs",
        element: (
          <ProtectedRoute>
            <ViewGraphs />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
