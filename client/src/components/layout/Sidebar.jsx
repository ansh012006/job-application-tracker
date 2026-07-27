import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaHome,
  FaBriefcase,
  FaPlus,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
        : "text-slate-700 hover:bg-slate-200 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col justify-between bg-white text-slate-900 shadow-2xl transition-transform duration-300 dark:bg-slate-900 dark:text-white lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Mobile Close Button */}
          <div className="flex justify-end p-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Logo */}
          <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800">
            <h1 className="text-3xl font-extrabold tracking-wide">
              💼 Job Tracker
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Track every opportunity.
            </p>
          </div>

          {/* User */}
          <div className="flex items-center gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-semibold">
                {user?.name || "User"}
              </h3>

              <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                {user?.email || "Welcome back!"}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 px-4 py-6">
            <NavLink
              to="/dashboard"
              end
              className={linkClass}
              onClick={closeSidebar}
            >
              <FaHome />
              Dashboard
            </NavLink>

            <NavLink
              to="/dashboard/jobs"
              className={linkClass}
              onClick={closeSidebar}
            >
              <FaBriefcase />
              All Jobs
            </NavLink>

            <NavLink
              to="/dashboard/jobs/new"
              className={linkClass}
              onClick={closeSidebar}
            >
              <FaPlus />
              Add Job
            </NavLink>

            <NavLink
              to="/dashboard/analytics"
              className={linkClass}
              onClick={closeSidebar}
            >
              <FaChartPie />
              Analytics
            </NavLink>

            <NavLink
              to="/dashboard/settings"
              className={linkClass}
              onClick={closeSidebar}
            >
              <FaCog />
              Settings
            </NavLink>
          </nav>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            <FaSignOutAlt />
            Logout
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            Job Tracker v1.0
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;