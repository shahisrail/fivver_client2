import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open/close state
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("You have been logged out successfully!", {
      position: "top-center",
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Header for small screens */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-400 to-blue-500 text-white flex justify-between items-center px-6 py-4 md:hidden z-10">
        <h1 className="text-xl font-semibold">
          <Link to={"/"}>Expense Tracker</Link>
        </h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md focus:outline-none bg-blue-600 hover:bg-blue-700"
        >
          <div className="space-y-1">
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </div>
        </button>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-64 bg-gradient-to-r from-green-400 to-blue-500 p-6 transform transition-transform z-20 ${
          isSidebarOpen ? "translate-x-0 min-h-screen" : "-translate-x-full min-h-screen"
        } md:relative md:translate-x-0 min-h-screen`}
      >
        <h2 className="text-white text-2xl font-semibold mb-6">
          <Link to={"/"}>Expense Tracker</Link>
        </h2>
        <ul className="text-white space-y-6">
          {[
            { path: "/dashboard", label: "Home" },
            { path: "/dashboard/profile", label: "Profile" },
            { path: "/dashboard/add-expense", label: "Add Expense" },
            { path: "/dashboard/view-expenses", label: "View Expenses" },
            { path: "/dashboard/add-savings", label: "Add Savings" },
            { path: "/dashboard/view-graphs", label: "View Graphs" },
          ].map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `hover:text-gray-300 p-3 rounded-lg transition ${
                    isActive
                      ? "bg-yellow-500 shadow-xl text-white"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-red-500 font-semibold hover:bg-red-500 hover:text-white py-2 px-4 rounded-lg transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1  transition-transform transform ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {/* Placeholder for main content */}
        <Outlet />
      </div>

      {/* Overlay to close sidebar on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default SidebarLayout;
