import "./ChatInput.css";
import { FiPaperclip, FiSend, FiMic } from "react-icons/fi";
import { createChatSession, sendMessage } from "../../../api/chat";
import toast from "react-hot-toast";
import { useRef, useState } from "react";

const ChatInput = ({
  activeSession,
  setActiveSession,
  refreshMessages,
  refreshSessions,
}) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);

    const textarea = textareaRef.current;

    textarea.style.height = "auto"; // reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // grow
  };

  const handleSend = async () => {
    if (!message.trim() || sending) return;

    try {
      setSending(true);

      let session = activeSession;

      // First message → create session
      if (!session) {
        const res = await createChatSession(message);

        session = res.data.data;

        setActiveSession(session);

        await refreshSessions();
      }

      // Send message
      await sendMessage(session.id, message);

      setMessage("");

      await refreshMessages();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-box">
        <button className="icon-btn">
          <FiPaperclip />
        </button>

        <textarea
          ref={textareaRef}
          placeholder="Ask anything about exploration data..."
          value={message}
          rows={1}
          onChange={handleChange}
        />

        <button className="send-btn" onClick={handleSend} disabled={sending}>
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
