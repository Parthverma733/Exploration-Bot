import "./AccountSettings.css";
import { useState } from "react";

const AccountSettings = () => {
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  return (
    <div className="account-settings">

      <h2>Account Settings</h2>

      <div className="account-grid">

        <div className="account-group">
          <label>Language</label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        <div className="account-group">
          <label>Timezone</label>

          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option>Asia/Kolkata</option>
            <option>UTC</option>
            <option>America/New_York</option>
          </select>
        </div>

      </div>

      <button className="save-account-btn">
        Save Changes
      </button>

    </div>
  );
};

export default AccountSettings;