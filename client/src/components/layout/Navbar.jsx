import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Navbar({ setSidebarOpen }) {
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
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-4 shadow-sm transition-colors duration-300 sm:px-6 lg:px-8 dark:border-slate-700 dark:bg-slate-900">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg border border-gray-300 p-2 lg:hidden dark:border-slate-600 dark:hover:bg-slate-800"
        >
          <FaBars />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-slate-800 sm:text-2xl lg:text-3xl dark:text-white">
            {title}
          </h2>

          <p className="truncate text-sm text-gray-500 dark:text-gray-300">
            Welcome back{user?.name ? `, ${user.name}` : ""} 👋
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
        {/* Theme */}
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
          className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600 sm:px-4"
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;