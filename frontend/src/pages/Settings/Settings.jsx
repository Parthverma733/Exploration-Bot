import AccountSettings from "./AccountSettings/AccountSettings";
import Appearance from "./Appearance/Appearance";
import Notifications from "./Notifications/Notifications";
import Preferences from "./Preferences/Preferences";

const Settings = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <AccountSettings />
      <Appearance />
      <Notifications />
      <Preferences />
    </div>
  );
};

export default Settings;
