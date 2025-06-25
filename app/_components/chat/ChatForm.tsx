import { useRef } from "react";
import { Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

interface ChatFormProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  generateBotResponse: (history: ChatMessage[]) => void;
}

export default function ChatForm({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}: ChatFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputRef.current) return;
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: ". . ." },
      ]);
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: ` pls use this :${userMessage}` },
      ]);
    }, 600);
  };
  return (
    <form
      className="bg-white p-4 d  mt-4 flex items-center justify-between gap-2"
      onSubmit={handleFormSubmit}
    >
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          required
          type="text"
          placeholder="Асуултаа асуугаарай"
          className="pl-10 rounded-[24px] focus-visible:ring-0"
        />
      </div>
      <Button
        variant="ghost"
        className="bg-[#2600FFB2] w-[40px] h-[40px] rounded-full
             hover:bg-[#2600FFB2] hover:shadow-none hover:cursor-default
             focus-visible:ring-0 focus-visible:outline-none border-none cursor-pointer"
      >
        <Send className="w-4 h-4 text-white" />
      </Button>
    </form>
  );
}
