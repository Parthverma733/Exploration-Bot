import "./Appearance.css";
import { useState } from "react";

const Appearance = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <div className="appearance-settings">
      <h2>Appearance</h2>

      <div className="appearance-list">

        <div className="appearance-item">
          <div>
            <h4>Dark Mode</h4>
            <p>Enable dark theme for the application.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="appearance-item">
          <div>
            <h4>Compact Layout</h4>
            <p>Reduce spacing for a denser interface.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={compactMode}
              onChange={() => setCompactMode(!compactMode)}
            />
            <span className="slider"></span>
          </label>
        </div>

      </div>
    </div>
  );
};

export default Appearance;