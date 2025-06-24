import Image from "next/image";

export default function ChatBotIcon() {
  return (
    <>
      <Image
        src={"/pikachu.png"}
        alt={"pikachu"}
        width={30}
        height={30}
        className="object-cover"
      />
    </>
  );
}
