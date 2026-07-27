import ProfileForm from "../components/settings/ProfileForm";
import PasswordForm from "../components/settings/PasswordForm";
import Preferences from "../components/settings/Preferences";

function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-gray-500">
          Manage your account and preferences.
        </p>
      </div>

      <ProfileForm />
      <PasswordForm />
      <Preferences />
    </div>
  );
}

export default Settings;