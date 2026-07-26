import "./ChatWindow.css";

import SuggestedPrompts from "../SuggestedPrompts/SuggestedPrompts";
import MessageBubble from "../MessageBubble/MessageBubble";
import ChatInput from "../ChatInput/ChatInput";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getChatMessages } from "../../../api/chat";

const ChatWindow = ({ activeSession, setActiveSession, refreshSessions }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    if (!activeSession) {
      setMessages([]);
      return;
    }

    try {
      setLoading(true);

      const response = await getChatMessages(activeSession.id);
      console.log(response.data.messages);
      setMessages(response.data.messages);
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeSession) {
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [activeSession]);

  return (
    <div className="chat-window">
      <div className="chat-body">
        {!activeSession ? (
          <>
            <div className="chat-welcome">
              <h1>Exploration Knowledge Assistant</h1>

              <p>
                Ask questions about seismic reports, well logs, basin data and
                exploration documents.
              </p>
            </div>

            <SuggestedPrompts />
          </>
        ) : loading ? (
          <p className="chat-loading">Loading conversation...</p>
        ) : (
          <div className="messages">
            {messages.length === 0 ? (
              <p className="empty-chat">
                Start the conversation by asking a question.
              </p>
            ) : (
              messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))
            )}
          </div>
        )}
      </div>

      <ChatInput
        activeSession={activeSession}
        setActiveSession={setActiveSession}
        refreshMessages={fetchMessages}
        refreshSessions={refreshSessions}
      />
    </div>
  );
};

export default ChatWindow;
