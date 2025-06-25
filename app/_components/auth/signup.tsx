"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import LoginWithGoogle from "./GoogleLogin";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Signup({ onSwitch }: { onSwitch: () => void }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          password,
          buddyImg: ["https://default-image.com/pet.png"],
          role: "user",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Бүртгэл амжилтгүй боллоо");
      } else {
        toast.success("Амжилттай бүртгэгдлээ!");
        onSwitch();
      }
    } catch {
      toast.error("Сүлжээний алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-60 flex flex-col justify-center items-center gap-8">
      <h1 className="text-black text-[16px] font-medium">Бүртгэл үүсгэх</h1>
      <div className="w-full flex flex-col gap-4 items-center">
        <LoginWithGoogle />
        <p className="opacity-[60%] font-normal">эсвэл</p>
        <Input
          placeholder="Нэр"
          inputMode="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-5 py-4 rounded-[24px] bg-[#f6f6f6]"
        />
        <Input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-5 py-4 rounded-[24px] bg-[#f6f6f6]"
        />
      </div>
      <div className="flex flex-col gap-1 justify-center items-center">
        <Button
          onClick={handleSignup}
          disabled={loading}
          className="rounded-[16px] bg-[#684dff] text-white cursor-pointer"
        >
          {loading ? "Ачааллаж байна..." : "Бүртгүүлэх"}
        </Button>
        <button
          onClick={onSwitch}
          className="text-[#684dff] underline px-4 py-3 cursor-pointer"
        >
          Нэвтрэх
        </button>
      </div>
    </div>
  );
}
