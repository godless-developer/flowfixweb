"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Input } from "@/components/ui/input";

export default function ReminderForAllEmployees() {
  const [ReminderForAllEmployees, setReminderForAllEmployees] = useState("");
  const [ReminderHeader, setReminderHeader] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!ReminderForAllEmployees.trim()) {
      toast.error("Мэдээллээ оруулна уу", { position: "top-center" });
      return;
    }
    if (!ReminderHeader.trim()) {
      toast.error("Мэдээллээ оруулна уу", { position: "top-center" });
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/reminder", {
        ReminderForAllEmployees,
        ReminderHeader,
      });

      toast.success("Амжилттай хадгалагдлаа!", { position: "top-center" });
      setReminderForAllEmployees(""); // input-г цэвэрлэх
      setReminderHeader(""); // input-г цэвэрлэх
    } catch {
      toast.error("Хадгалах үед алдаа гарлаа", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={ReminderHeader}
        onChange={(e) => setReminderHeader(e.target.value)}
        placeholder="Гарчиг"
        className="h-5 w-full px-5 py-3 rounded-[16px] border-[1px] border-black"
      />
      <Textarea
        value={ReminderForAllEmployees}
        onChange={(e) => setReminderForAllEmployees(e.target.value)}
        placeholder="Жишээ: Үндэсний их баяр наадмын өдрүүдэд амарна."
        className="h-[202px] w-full px-6 py-5 rounded-[12px] border-[1px] border-black"
      />
      <Button
        onClick={handleSave}
        disabled={loading}
        className="w-fit px-6 bg-[#684dff] text-white rounded-3xl self-end"
      >
        {loading ? "Хадгалж байна..." : "Болсон"}
      </Button>
    </div>
  );
}
