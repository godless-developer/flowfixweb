interface ChatMessageProps {
  chat: {
    hideInChat?: boolean;
    role: "model" | "user";
    text: string;
  };
}

export default function ChatMessage({ chat }: ChatMessageProps) {
  return (
    !chat.hideInChat && (
      <div
        className={` ${
          chat.role === "model" ? "bot" : "user"
        }-message flex items-center w-full `}
      >
        <p
          className={`${
            chat.role === "model"
              ? "bg-gray-200 p-2 rounded-lg "
              : " flex flex-col items-end bg-[#684dff] max-w-xs rounded-lg p-2 "
          }
      `}
        >
          {chat.text}
        </p>
      </div>
    )
  );
}
