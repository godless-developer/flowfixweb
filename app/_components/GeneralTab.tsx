"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "./Setting";
import Questions from "./chat/Question";
import Buddy from "./Buddy";
import { Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";
import Todo from "./Todo";

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
    <Tabs defaultValue="Question" className="flex flex-col gap-8">
      <TabsList className="mx-auto grid w-[340px] rounded-[99px] grid-cols-4">
        <div className="flex gap-40">
          <div className="flex gap-4">
            <TabsTrigger
              value="Question"
              className="rounded-[99px] cursor-pointer"
            >
              Question
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
              Todo
            </TabsTrigger>
            <TabsTrigger
              value="Settings"
              className="rounded-[99px] cursor-pointer"
            >
              Settings
            </TabsTrigger>
          </div>
          <div>
            <button
              onClick={minimize}
              className="text-gray-600 hover:text-black transition cursor-pointer"
            >
              <Minimize2 />
            </button>
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
