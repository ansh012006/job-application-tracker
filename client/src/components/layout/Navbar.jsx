import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const titles = {
    "/dashboard": "Dashboard",
    "/dashboard/jobs": "All Jobs",
    "/dashboard/jobs/new": "Add Job",
    "/dashboard/analytics": "Analytics",
    "/dashboard/settings": "Settings",
  };

  const title = titles[location.pathname] || "Dashboard";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-5 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
          {title}
        </h2>

        <p className="text-gray-500 dark:text-gray-300">
          Welcome back{user?.name ? `, ${user.name}` : ""} 👋
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium transition hover:bg-gray-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Settings */}
        <Link
          to="/dashboard/settings"
          className="rounded-lg border border-gray-300 p-2 text-slate-700 transition hover:bg-gray-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
        >
          <FaCog />
        </Link>

        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;