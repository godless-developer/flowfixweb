"use client";

import Image from "next/image";
import Link from "next/link";

type IntroTwoProps = {
  onNext: () => void;
  onSkip: () => void;
};

export default function IntroThree({ onNext, onSkip }: IntroTwoProps) {
  return (
    <div
      className="flex flex-col justify-center items-center gap-8 p-5 relative"
      style={{
        width: "904px",
        height: "618px",
        flexShrink: 0,
        borderRadius: "24px",
        boxShadow: "0px 4px 24px #C6C6C6",
        backgroundColor: "#FFF",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex gap-4 items-start">
        <Image
          src="/pikachu.png"
          alt="Pikachu"
          width={80}
          height={80}
          className="w-[80px] h-[80px]"
        />
        <div className="relative bg-gray-100 px-6 py-4 rounded-xl max-w-xl shadow-md">
          <p className="text-gray-800 text-lg font-medium">
            Би доорх төрлийн асуултуудад хариулж чадна
          </p>
          <div className="absolute -bottom-3 left-12 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-100" />
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <OptionItem
            icon="/1.png"
            title="Компанийн дотоод дүрэм, гэрээ"
            description="Түлхүүр үг ашиглан хялбархан хэрэгтэй мэдээллээ асуух боломжтой"
          />
          <div className="w-full h-px bg-gray-300 mt-8" />
          <OptionItem
            icon="/2.png"
            title="Оффисын талаар"
            description="Ямар нэг зүйл олохгүй, мэдэхгүй бол санаа зоволгүй асуугаарай"
          />
          <div className="w-full h-px bg-gray-300 mt-8" />
          <OptionItem
            icon="/3.png"
            title="Ажлын талаар бүхий л зүйлс"
            description="Хэдэн цагт тардаг, яаж чөлөө авдаг вэ зэрэгийг ч асуух боломжтой"
          />
        </div>
      </div>

      <div className="absolute bottom-5 left-8 right-8 flex justify-between">
        <button
          className="text-sm text-[#684DFF] underline cursor-pointer"
          onClick={onSkip}
        >
          Алгасах
        </button>
        <Link
          href={"./"}
          className="bg-[#684DFF] text-white px-4 py-2 rounded-xl transition cursor-pointer"
        >
          Үргэлжлүүлэх
        </Link>
      </div>
    </div>
  );
}

function OptionItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <Image src={icon} alt={title} width={40} height={40} className="mt-1" />
      <div>
        <p className="font-semibold text-base">{title}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
