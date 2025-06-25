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
      <div className="relative bg-gray-100 px-6 py-4 rounded-xl max-w-xl text-center shadow-md">
        <p className="text-gray-800 text-lg font-medium">
          Сайн уу, би чиний Work buddy чинь байна.
        </p>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-100" />
      </div>

      <Image
        src="/pikachu.png"
        alt="Pikachu"
        width={2000}
        height={2000}
        className="w-[120px] h-[120px]"
      />

      <div className="absolute bottom-5 left-0 w-full px-8 flex justify-between">
        <button className="text-sm text-[#684DFF] underline" onClick={onSkip}>
          Алгасах
        </button>

        <button
          className="bg-[#684DFF] text-white px-4 py-2 rounded-xl"
          onClick={onNext}
        >
          Үргэлжлүүлэх
        </button>
      </div>
    </div>
  );
}
