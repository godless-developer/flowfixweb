import { Input } from "@/components/ui/input";
import LoginWithGoogle from "./GoogleLogin";
import { Button } from "@/components/ui/button";

export default function Login({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="w-full px-60 h- flex flex-col justify-center items-center gap-8">
      <h1 className="text-black text-[16px] font-medium">Нэвтрэх</h1>
      <div className="w-full flex flex-col gap-4 items-center">
        <LoginWithGoogle />
        <p className="opacity-[60%] font-normal">эсвэл</p>
        <Input
          placeholder="Нэр"
          inputMode="text"
          className="px-5 py-4 rounded-[24px] bg-[#f6f6f6]"
        />
        <Input
          placeholder="Нууц үг"
          className="px-5 py-4 rounded-[24px] bg-[#f6f6f6]"
        />
      </div>
      <div className="flex flex-col gap-1 justify-center items-center">
        <Button className="rounded-[16px] px-7 bg-[#684dff] text-white cursor-pointer">
          Нэвтрэх
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
