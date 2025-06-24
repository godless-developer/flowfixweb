import React from "react";

interface TypingIndicatorProps {
  botName: string;
}

const Typing: React.FC<TypingIndicatorProps> = ({ botName }) => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "8px",
  };

  const senderStyle: React.CSSProperties = {
    fontSize: "11px",
    color: "#666",
    marginBottom: "4px",
    fontWeight: "500",
  };

  const bubbleStyle: React.CSSProperties = {
    backgroundColor: "#f1f3f4",
    borderRadius: "18px",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  const dotStyle: React.CSSProperties = {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#999",
    animation: "typing 1.4s infinite ease-in-out",
  };

  const dot1Style = { ...dotStyle, animationDelay: "0s" };
  const dot2Style = { ...dotStyle, animationDelay: "0.2s" };
  const dot3Style = { ...dotStyle, animationDelay: "0.4s" };

  // Inject keyframes for animation
  React.useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      @keyframes typing {
        0%, 60%, 100% {
          transform: scale(1);
          opacity: 0.5;
        }
        30% {
          transform: scale(1.2);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={senderStyle}>{botName}</div>
      <div style={bubbleStyle}>
        <div style={dot1Style} />
        <div style={dot2Style} />
        <div style={dot3Style} />
      </div>
    </div>
  );
};

export default Typing;
