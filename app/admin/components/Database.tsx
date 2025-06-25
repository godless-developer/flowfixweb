"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

export default function Database() {
  const [companyInfo, setCompanyInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!companyInfo.trim()) {
      toast.error("Мэдээллээ оруулна уу", { position: "top-center" });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/info", { companyInfo });

      toast.success("Амжилттай хадгалагдлаа!", { position: "top-center" });
      setCompanyInfo(""); // input-г цэвэрлэх
    } catch (error) {
      toast.error("Хадгалах үед алдаа гарлаа", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        value={companyInfo}
        onChange={(e) => setCompanyInfo(e.target.value)}
        placeholder="Жишээ: Манай байгууллага 18 цагт тардаг."
        className="h-[202px] w-full px-6 py-5 rounded-[12px] border-[1px] border-black"
      />
      <Button
        onClick={handleSave}
        disabled={loading}
        className="w-fit px-6 bg-[#684dff] text-white rounded-[12px]"
      >
        {loading ? "Хадгалж байна..." : "Хадгалах"}
      </Button>
    </div>
  );
}
