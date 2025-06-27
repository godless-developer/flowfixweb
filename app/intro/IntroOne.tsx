"use client";
import Image from "next/image";

type Props = {
  onNext: () => void;
  onSkip: () => void;
};

export default function IntroOne({ onNext, onSkip }: Props) {
  return (
    <div
      className="flex flex-col justify-center items-center gap-8 p-5 relative"
      style={{
        width: "904px",
        height: "618px",
        borderRadius: "24px",
        boxShadow: "0px 4px 24px #C6C6C6",
        backgroundColor: "#FFF",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="relative bg-gray-100 px-6 py-4 rounded-xl w-[294px] h-[78px] text-center shadow-md">
        <p className="text-[#000000] text-[16px] font-normal w-[254px] h-[38px]">
          Сайн уу, би чиний Work buddy чинь байна.
        </p>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-100" />
      </div>

      <Image
        src="/frog.gif"
        alt="frig"
        width={2000}
        height={2000}
        className="w-[100px] h-[100px]"
      />

      <div className="absolute bottom-5 left-0 w-full px-8 flex justify-between">
        <button
          className="text-[rgba(0,0,0,0.60)] text-[16px] font-medium font-sans underline underline-offset-[4px] decoration-solid decoration-1 cursor-pointer text-center"
          onClick={onSkip}
        >
          Алгасах
        </button>
        <button
          className="flex w-[146px] px-4 py-3 justify-center items-center gap-[10px] rounded-[24px] bg-[#684DFF] text-white cursor-pointer"
          onClick={onNext}
        >
          Үргэлжлүүлэх
        </button>
      </div>
    </div>
  );
}
