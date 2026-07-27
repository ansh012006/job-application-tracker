import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function ProfileForm() {
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      setForm({
        name: res.data.user.name,
        email: res.data.user.email,
      });
    } catch (err) {
      console.error(err);
      setMessage("Failed to load profile.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setMessage("Name cannot be empty.");
      setIsError(true);
      return;
    }

    setSaving(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await updateProfile({
        name: form.name.trim(),
      });

      setUser(res.data.user);

      setForm({
        name: res.data.user.name,
        email: res.data.user.email,
      });

      setMessage(res.data.message || "Profile updated successfully.");
    } catch (err) {
      setIsError(true);
      setMessage(
        err.response?.data?.message || "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white p-3 text-slate-900 transition-all duration-300 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white";

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block font-medium text-slate-700 dark:text-gray-200">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700 dark:text-gray-200">
            Email Address
          </label>

          <input
            type="email"
            value={form.email}
            disabled
            className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-500 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
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

export default ProfileForm;