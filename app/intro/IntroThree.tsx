"use client";

import Image from "next/image";
import Link from "next/link";

type IntroTwoProps = {
  onNext: () => void;
  onSkip: () => void;
};

export default function IntroThree({ onSkip }: IntroTwoProps) {
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
          src="/frog.gif"
          alt="frog"
          width={80}
          height={80}
          className="w-[80px] h-[80px]"
        />
        <div className="relative bg-gray-100 px-6 py-4 rounded-[16px] w-[294px] h-[78px] shadow-md">
          <p className="text-[#000000] text-[16px] font-normal w-[254px] h-[38px]">
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

          <OptionItem
            icon="/2.png"
            title="Оффисын талаар"
            description="Ямар нэг зүйл олохгүй, мэдэхгүй бол санаа зоволгүй асуугаарай"
          />

          <OptionItem
            icon="/3.png"
            title="Ажлын талаар бүхий л зүйлс"
            description="Хэдэн цагт тардаг, яаж чөлөө авдаг вэ зэрэгийг ч асуух боломжтой"
          />
        </div>
      </div>

      <div className="absolute bottom-5 left-8 right-8 flex justify-between">
        <button
          className="text-[rgba(0,0,0,0.60)] text-[16px] font-medium font-sans underline underline-offset-[4px] decoration-solid decoration-1 cursor-pointer text-center"
          onClick={onSkip}
        >
          Алгасах
        </button>
        <Link
          href={"./"}
          className="flex w-[146px] px-4 py-3 justify-center items-center gap-[10px] rounded-[24px] bg-[#684DFF] text-white cursor-pointer"
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
