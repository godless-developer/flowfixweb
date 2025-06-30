"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Database from "./Database";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ReminderForAllEmployees from "./ReminderForAllEmployees";

export default function AdminTab() {
  const router = useRouter();

  const handleLogout = () => {
    // localStorage-с хэрэглэгчийн мэдээллийг устгах
    localStorage.removeItem("user");

    // Энд та state/context-г цэвэрлэж болно (хэрэв ашиглаж байвал)

    // Нэвтрэх хуудсанд буюу үндсэн "/" рүү шилжүүлэх
    router.push("/");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 px-4">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="rounded-md px-4 py-2"
        >
          Logout
        </Button>
      </div>

      <Tabs
        defaultValue="database"
        className="flex justify-start flex-col gap-8"
      >
        <TabsList className="mx-auto grid w-[340px] rounded-[99px] grid-cols-2">
          <TabsTrigger
            value="database"
            className="rounded-[99px] cursor-pointer"
          >
            Өгөгдөл оруулах
          </TabsTrigger>
          <TabsTrigger
            value="ReminderForAllEmployees"
            className="rounded-[99px] cursor-pointer px-3"
          >
            Мэдээлэл
          </TabsTrigger>
        </TabsList>

        <TabsContent value="database">
          <Database />
        </TabsContent>
        <TabsContent value="ReminderForAllEmployees">
          <ReminderForAllEmployees />
        </TabsContent>
      </Tabs>
    </>
  );
}
