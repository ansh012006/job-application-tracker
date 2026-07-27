import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

function Preferences() {
  const { darkMode, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") === "true"
  );

  const savePreferences = () => {
    localStorage.setItem("notifications", notifications);

    alert("Preferences saved successfully!");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Preferences
      </h2>

      <div className="space-y-6">
        {/* Dark Mode */}
        <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-slate-700">
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">
              Dark Mode
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Switch between light and dark appearance.
            </p>
          </div>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleTheme}
            className="h-5 w-5 cursor-pointer accent-blue-600"
          />
        </div>

        {/* Email Notifications */}
        <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-slate-700">
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">
              Email Notifications
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive updates about your job applications.
            </p>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="h-5 w-5 cursor-pointer accent-blue-600"
          />
        </div>

        <button
          onClick={savePreferences}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}

export default Preferences;