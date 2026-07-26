import "./Notifications.css";
import { useState } from "react";

const Notifications = () => {
  const [settings, setSettings] = useState({
    email: true,
    ai: true,
    processing: false,
    system: true,
  });

  const toggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <div className="notifications-settings">
      <h2>Notifications</h2>

      <div className="notification-list">

        <div className="notification-item">
          <div>
            <h4>Email Notifications</h4>
            <p>Receive important updates via email.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.email}
              onChange={() => toggle("email")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>AI Assistant Notifications</h4>
            <p>Notify when AI tasks are completed.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.ai}
              onChange={() => toggle("ai")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>Document Processing</h4>
            <p>Get notified when uploaded PDFs are processed.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.processing}
              onChange={() => toggle("processing")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>System Notifications</h4>
            <p>Receive maintenance and security alerts.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.system}
              onChange={() => toggle("system")}
            />
            <span className="slider"></span>
          </label>
        </div>

      </div>
    </div>
  );
};

export default Notifications;