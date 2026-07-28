import { FiUser, FiCopy, FiCheck } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import toast from "react-hot-toast";

const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.message);

    setCopied(true);
    toast.success("Copied");

    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      className={[
        "flex items-start gap-4",
        isUser ? "flex-row-reverse" : "",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full text-xl text-white",
          isUser ? "bg-primary" : "bg-sidebar",
        ].join(" ")}
      >
        {isUser ? <FiUser /> : <RiRobot2Line />}
      </div>

      <div className="max-w-[85%] md:max-w-[75%]">
        <div
          className={[
            "relative rounded-2xl px-5 py-4 leading-relaxed shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
            isUser
              ? "border-0 bg-primary text-white"
              : "border border-border bg-white text-text",
            "prose prose-sm max-w-none",
            isUser ? "prose-invert" : "",
          ].join(" ")}
        >
          {!isUser && (
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 flex items-center gap-1 rounded-md  bg-white px-2 py-1 text-xs text-text-light transition hover:bg-gray-100"
              title="Copy response"
            >
              {copied ? <FiCheck size={10} /> : <FiCopy size={10} />}
              
            </button>
          )}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.message || ""}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
