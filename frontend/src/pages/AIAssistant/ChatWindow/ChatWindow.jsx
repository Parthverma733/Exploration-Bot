import MessageBubble from "../MessageBubble/MessageBubble";
import ChatInput from "../ChatInput/ChatInput";
import Skeleton from "react-loading-skeleton";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { getChatMessages } from "../../../api/chat";
import { FiDatabase, FiLayers, FiMap, FiFileText } from "react-icons/fi";

const suggestedPrompts = [
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
    <div className="mb-9 grid grid-cols-1 gap-[18px] md:grid-cols-2">
      {suggestedPrompts.map((prompt, index) => (
        <button
          type="button"
          key={index}
          className="flex items-center gap-4 rounded-[14px] border border-border bg-white p-[18px] text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[22px] text-primary">
            {prompt.icon}
          </div>

          <span className="text-[15px] font-medium text-text">
            {prompt.title}
          </span>
        </button>
      ))}
    </div>
  );
};

const ChatWindow = ({ activeSession, setActiveSession, refreshSessions }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

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
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (activeSession) {
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [activeSession]);

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col bg-background">
      <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
        {!activeSession ? (
          <>
            <div className="mb-9 text-center">
              <h1 className="mb-3 text-2xl font-bold md:text-[34px]">
                Exploration Knowledge Assistant
              </h1>

              <p className="mx-auto max-w-[650px] leading-relaxed text-text-light">
                Ask questions about seismic reports, well logs, basin data and
                exploration documents.
              </p>
            </div>

            <SuggestedPrompts />
          </>
        ) : loading ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`flex ${
                  i % 2 !== 0 ? "justify-start" : "justify-end"
                }`}
              >
                <Skeleton width={320} height={70} borderRadius={16} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-[18px]">
            {messages.length === 0 ? (
              <p className="flex h-full items-center justify-center text-[15px] text-gray-500">
                Start the conversation by asking a question.
              </p>
            ) : (
              messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))
            )}
            <div ref={messagesEndRef}></div>
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
