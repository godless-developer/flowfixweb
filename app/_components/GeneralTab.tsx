import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "./Setting";
import Questions from "./chat/Question";
import Buddy from "./Buddy";
import { Minimize } from "lucide-react";

type Props = {
  minimize: () => void;
};

export default function GeneralTab({ minimize }: Props) {
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
              className="text-gray-600 hover:text-black transition"
            >
              <Minimize />
            </button>
          </div>
        </div>
      </TabsList>

      <TabsContent value="Question">
        <Questions />
      </TabsContent>
      <TabsContent value="Buddy">
        <Buddy />
      </TabsContent>
      <TabsContent value="Todo">TODO tab</TabsContent>
      <TabsContent value="Settings">
        <Settings />
      </TabsContent>
    </Tabs>
  );
}
