import "./Preferences.css";
import { useState } from "react";

const Preferences = () => {
  const [model, setModel] = useState("Mistral");
  const [responseLength, setResponseLength] = useState("Detailed");
  const [citations, setCitations] = useState(true);
  const [basin, setBasin] = useState("All Basins");

  return (
    <div className="preferences-settings">

      <h2>AI Preferences</h2>

      <div className="preferences-grid">

        <div className="preference-group">
          <label>Default AI Model</label>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option>Mistral</option>
            <option>Llama 3</option>
            <option>Gemma</option>
          </select>
        </div>

        <div className="preference-group">
          <label>Response Length</label>

          <select
            value={responseLength}
            onChange={(e) => setResponseLength(e.target.value)}
          >
            <option>Short</option>
            <option>Detailed</option>
            <option>Comprehensive</option>
          </select>
        </div>

        <div className="preference-group">
          <label>Default Basin</label>

          <select
            value={basin}
            onChange={(e) => setBasin(e.target.value)}
          >
            <option>All Basins</option>
            <option>Krishna-Godavari</option>
            <option>Mumbai Offshore</option>
            <option>Cambay</option>
            <option>Cauvery</option>
          </select>
        </div>

        <div className="preference-group switch-group">

          <div>
            <h4>Show Citations</h4>
            <p>Display document references in AI responses.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={citations}
              onChange={() => setCitations(!citations)}
            />
            <span className="slider"></span>
          </label>

        </div>

      </div>

      <button className="save-preferences-btn">
        Save Preferences
      </button>

    </div>
  );
};

export default Preferences;