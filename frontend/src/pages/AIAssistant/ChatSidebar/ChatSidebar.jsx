import { FiPlus, FiMessageSquare } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

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
    <aside className="flex min-h-0 flex-col justify-between border-b border-border bg-white p-5 lg:border-b-0 lg:border-r">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-2.5 rounded-[10px] border-0 bg-primary text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-primary-hover"
          onClick={handleNewChat}
        >
          <FiPlus />
          New Chat
        </button>

        <h3 className="mb-4 mt-7 text-sm uppercase tracking-wide text-text-light">
          Recent Chats
        </h3>

        <div className="flex flex-col gap-2">
          {loading ? (
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} height={48} borderRadius={10} />
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <p className="text-sm text-gray-500">No chats yet</p>
          ) : (
            sessions.map((chat) => (
              <button
                type="button"
                key={chat.id}
                className={[
                  "flex w-full items-center gap-3 rounded-[10px] border-0 px-3.5 py-3.5 text-left transition-colors duration-200",
                  activeSession?.id === chat.id
                    ? "bg-blue-50 text-primary"
                    : "bg-transparent hover:bg-slate-100",
                ].join(" ")}
                onClick={() => setActiveSession(chat)}
              >
                <FiMessageSquare className="shrink-0 text-lg" />

                <span className="truncate">{chat.title || "New Chat"}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
