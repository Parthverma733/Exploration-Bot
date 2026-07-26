import "./Settings.css";

import AccountSettings from "./AccountSettings/AccountSettings";
import Appearance from "./Appearance/Appearance";
import Notifications from "./Notifications/Notifications";
import Preferences from "./Preferences/Preferences";

const Settings = () => {
  return (
    <div className="settings-page">
      <AccountSettings />
      <Appearance />
      <Notifications />
      <Preferences />
    </div>
  );
};

export default Settings;
