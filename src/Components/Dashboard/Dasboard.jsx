import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Importing toast from sonner

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Show toast notification
    toast.success("You have been logged out successfully!", {
      position: "top-center", // Toast will show at the top center
    });

    // Redirect the user to the login page after a delay
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Wait for 2 seconds to show the toast before redirecting
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-r from-green-400 to-blue-500 p-4">
        <h2 className="text-white text-2xl font-semibold mb-6">Dashboard</h2>
        <ul className="text-white space-y-4">
          <li>
            <Link to="/dashboard" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/settings" className="hover:text-gray-300">
              Settings
            </Link>
          </li>
          <li>
            <Link onClick={handleLogout} className="hover:text-gray-300">
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold">Welcome to the Dashboard</h1>
        <p className="mt-4">
          This is the main content area where you can display the dashboard's
          content.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
