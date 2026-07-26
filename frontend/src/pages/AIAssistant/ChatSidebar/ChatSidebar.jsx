import "./ChatSidebar.css";
import { FiPlus, FiMessageSquare } from "react-icons/fi";
const ChatSidebar = ({
  sessions,
  activeSession,
  setActiveSession,
  loading,
}) => {
  const handleNewChat = () => {
    setActiveSession(null);
  };
  return (
    <aside className="chat-sidebar">
      <div>
        <button className="new-chat-btn" onClick={handleNewChat}>
          <FiPlus />
          New Chat
        </button>

        <h3 className="recent-title">Recent Chats</h3>

        <div className="chat-history">
          {loading ? (
            <p className="empty-chat">Loading chats...</p>
          ) : sessions.length === 0 ? (
            <p className="empty-chat">No chats yet</p>
          ) : (
            sessions.map((chat) => (
              <button
                key={chat.id}
                className={`chat-item ${
                  activeSession?.id === chat.id ? "active" : ""
                }`}
                onClick={() => setActiveSession(chat)}
              >
                <FiMessageSquare />

                <span>{chat.title || "New Chat"}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
