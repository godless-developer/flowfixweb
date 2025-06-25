"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";

type ChatMessageType = { role: "model" | "user"; text: string };

export default function Questions({ userName }: { userName: string }) {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // 🧠 AI chatbot хариу үүсгэх
  const generateBotResponse = async (history: ChatMessageType[]) => {
    const updateHistory = (text: string) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== ". . ."),
        { role: "model", text },
      ]);
    };

    const apiHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_KEY as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: apiHistory }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Алдаа");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.error("AI хариу авахад алдаа:", error);
    }
  };

  // 🏁 Start - fetch companyInfo from API
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await axios.get("/api/info");
        if (res.data.length > 0) {
          const latestInfo = res.data[res.data.length - 1].companyInfo;

          // 🔰 initial companyInfo-г chatHistory-д model мэдлэг болгон нэмэх
          setChatHistory([
            {
              role: "model",
              text: latestInfo,
            },
          ]);
          console.log(latestInfo);
          setInitialLoaded(true);
        }
      } catch (err) {
        console.error("Компанийн мэдээлэл татаж чадсангүй:", err);
      }
    };

    fetchCompanyInfo();
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="w-full flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src="/pikachu.png"
              alt="Pikachu"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <h2 className="text-[16px] text-[#000000]">
            {userName || "Pikachu"}
          </h2>
        </div>
      </CardHeader>

      {initialLoaded ? (
        <>
          <div
            ref={chatBodyRef}
            className="w-full p-4 h-[380px] overflow-y-auto flex flex-col gap-4"
          >
            {chatHistory.map((chat, index) => {
              if (index === 0) return null;
              return (
                <div
                  key={index}
                  className={chat.role === "model" ? "self-start" : "self-end"}
                >
                  <ChatMessage chat={chat} />
                </div>
              );
            })}
          </div>

          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </>
      ) : (
        <CardContent>Түр хүлээнэ үү...</CardContent>
      )}
    </div>
  );
}
