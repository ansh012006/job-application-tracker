import { useState } from "react";
import { changePassword } from "../../services/authService";

function PasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);

    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      setIsError(true);
      return setMessage("Please fill all fields.");
    }

    if (form.newPassword.length < 6) {
      setIsError(true);
      return setMessage("Password must be at least 6 characters.");
    }

    if (form.newPassword !== form.confirmPassword) {
      setIsError(true);
      return setMessage("Passwords do not match.");
    }

    try {
      setSaving(true);

      const res = await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setMessage(res.data.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setIsError(true);

      setMessage(
        err.response?.data?.message || "Unable to change password."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white p-3 text-slate-900 placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Security
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block font-medium text-slate-700 dark:text-gray-200">
            Current Password
          </label>

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700 dark:text-gray-200">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700 dark:text-gray-200">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Updating..." : "Change Password"}
        </button>

        {message && (
          <p
            className={`font-medium ${
              isError
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default PasswordForm;