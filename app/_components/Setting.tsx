import { Switch } from "@/components/ui/switch";
import React from "react";

export const Settings = () => {
  return (
    <div className="w-full h-[490px] flex flex-col gap-8 items-start ">
      <h4 className="text-[16px] font-[400] text-[#7F7F7F] ">
        Мэдэгдлийн тохиргоо
      </h4>
      <div className="w-full  flex flex-col gap-5 py-6 px-5 items-start rounded-[12px] border bg-[#F2F2F2] ">
        <div className="w-full flex justify-between items-center border-b pb-5 ">
          <h4 className="text-[16px] font-[400]  ">Хийх зүйлсийн мэдэгдэл</h4>
          <Switch />
        </div>
        <div className="w-full flex justify-between items-center border-b pb-5 ">
          <h4 className="text-[16px] font-[400]  ">Mood check ups</h4>
          <Switch />
        </div>
        <div className="w-full flex justify-between items-center border-b pb-5 ">
          <h4 className="text-[16px] font-[400]  ">Санал хураалт</h4>
          <Switch />
        </div>
        <div className="w-full flex justify-between items-center ">
          <h4 className="text-[16px] font-[400]  ">Хийх зүйлсийн мэдэгдэл</h4>
          <Switch />
        </div>
      </div>
    </div>
  );
};
