import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ChatSidebar from "./ChatSidebar/ChatSidebar";
import ChatWindow from "./ChatWindow/ChatWindow";

import { getChatSessions } from "../../api/chat";

const AIAssistant = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      setLoading(true);

      const response = await getChatSessions();

      setSessions(response.data.data);
    } catch (error) {
      toast.error("Failed to load chat sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="mx-4 mb-4 grid h-[calc(100vh-90px)] min-h-[480px] grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-background lg:grid-cols-[280px_1fr]">
      <ChatSidebar
        sessions={sessions}
        activeSession={activeSession}
        setActiveSession={setActiveSession}
        loading={loading}
      />

      <ChatWindow
        activeSession={activeSession}
        setActiveSession={setActiveSession}
        refreshSessions={fetchSessions}
      />
    </div>
  );
};

export default AIAssistant;
