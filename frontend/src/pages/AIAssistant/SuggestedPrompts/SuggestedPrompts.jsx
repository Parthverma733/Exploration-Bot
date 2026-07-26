import "./SuggestedPrompts.css";

import {
  FiDatabase,
  FiLayers,
  FiMap,
  FiFileText,
} from "react-icons/fi";

const prompts = [
  {
    icon: <FiDatabase />,
    title: "Summarize KG Basin reports",
  },
  {
    icon: <FiLayers />,
    title: "Compare well log data",
  },
  {
    icon: <FiMap />,
    title: "Show basin exploration history",
  },
  {
    icon: <FiFileText />,
    title: "Generate reservoir report",
  },
];

const SuggestedPrompts = () => {
  return (
    <div className="suggested-prompts">
      {prompts.map((prompt, index) => (
        <button key={index} className="prompt-card">
          <div className="prompt-icon">{prompt.icon}</div>

          <span>{prompt.title}</span>
        </button>
      ))}
    </div>
  );
};

export default SuggestedPrompts;