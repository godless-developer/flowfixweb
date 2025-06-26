"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "./Setting";
import Questions from "./chat/Question";
import Buddy from "./Buddy";
import { Shrink, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { DialogClose } from "@/components/ui/dialog";

type Props = {
  minimize: () => void;
};

export default function GeneralTab({ minimize }: Props) {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name); // name авна
    }
  }, []);
  return (
    <Tabs defaultValue="Question" className="flex flex-col relative">
      <TabsList className="mx-auto grid w-[340px] rounded-[99px] grid-cols-4 ">
        <div className="flex gap-40">
          <div className="flex gap-2">
            <TabsTrigger
              value="Question"
              className="rounded-[99px] cursor-pointer"
            >
              Асуулт
            </TabsTrigger>
            <TabsTrigger
              value="Buddy"
              className="rounded-[99px] cursor-pointer px-3"
            >
              Buddy
            </TabsTrigger>
            <TabsTrigger
              value="Todo"
              className="rounded-[99px] cursor-pointer px-4"
            >
              Хийх зүйлс
            </TabsTrigger>
            <TabsTrigger
              value="Settings"
              className="rounded-[99px] cursor-pointer"
            >
              Тохиргоо
            </TabsTrigger>
          </div>
          <div className="flex absolute top-[-2] right-0">
            <button className="text-gray-600 hover:text-black transition cursor-pointer p-2">
              <User />
            </button>
            <button
              onClick={minimize}
              className="text-gray-600 hover:text-black transition cursor-pointer p-2"
            >
              <Shrink />
            </button>
            <DialogClose>
              <X
                size={24}
                className="text-gray-600 hover:text-black transition cursor-pointer "
              />
            </DialogClose>
          </div>
        </div>
      </TabsList>

      <TabsContent value="Question">
        <Questions userName={userName} />
      </TabsContent>
      <TabsContent value="Buddy">
        <Buddy userName={userName} />
      </TabsContent>
      <TabsContent value="Todo">
        <Todo />
      </TabsContent>
      <TabsContent value="Settings">
        <Settings />
      </TabsContent>
    </Tabs>
  );
}
