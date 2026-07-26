import "./MessageBubble.css";
import { FiUser } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`message-row ${isUser ? "user" : "assistant"}`}>
      <div className="message-avatar">
        {isUser ? <FiUser /> : <RiRobot2Line />}
      </div>

      <div className="message-content">
        <div className="message-text">
          {message.message || ""}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;