import { FiPaperclip, FiSend } from "react-icons/fi";
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-white px-4 py-5 md:px-8">
      <div className="flex items-end gap-3 rounded-2xl border border-border bg-background px-4 py-3">
        <button
          type="button"
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] border-0 bg-transparent text-xl text-text-light transition-colors duration-200 hover:bg-slate-200"
        >
          <FiPaperclip />
        </button>

        <textarea
          ref={textareaRef}
          placeholder="Ask anything about exploration data..."
          value={message}
          rows={1}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="max-h-[180px] min-h-7 flex-1 resize-none overflow-y-auto border-0 bg-transparent text-[15px] leading-relaxed"
        />

        <button
          type="button"
          className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border-0 bg-primary text-xl text-white transition-colors duration-200 hover:bg-primary-hover disabled:opacity-60"
          onClick={handleSend}
          disabled={sending}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
