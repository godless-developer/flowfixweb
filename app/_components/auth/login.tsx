"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import LoginWithGoogle from "./GoogleLogin";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Login({
  onSwitch,
  onLoginSuccess,
}: {
  onSwitch: () => void;
  onLoginSuccess: () => void;
}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Нэвтрэхэд алдаа гарлаа");
      } else {
        toast.success("Амжилттай нэвтэрлээ!", { position: "top-center" });
        localStorage.setItem("user", JSON.stringify(data.user));
        onLoginSuccess();

        // Шилжүүлэлт role-аар:
        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch {
      toast.error("Сүлжээний алдаа", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-60 flex flex-col justify-center items-center gap-8">
      <h1 className="text-black text-[16px] font-medium">Нэвтрэх</h1>
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
          onClick={handleLogin}
          disabled={loading}
          className="rounded-[16px] px-7 bg-[#684dff] text-white cursor-pointer"
        >
          {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
        </Button>
        <button
          onClick={onSwitch}
          className="text-[#684dff] underline px-4 py-3 cursor-pointer"
        >
          Бүртгүүлэх
        </button>
      </div>
    </div>
  );
}
