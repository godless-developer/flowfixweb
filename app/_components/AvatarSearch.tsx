"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, Expand, Search } from "lucide-react";
import Image from "next/image";
import GeneralTab from "./GeneralTab";
import { useEffect, useState } from "react";
import Questions from "./chat/Question";
import Login from "./auth/login";
import Signup from "./auth/signup";

export default function AvatarSearch() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [showSignup, setShowSignup] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name); // name авна
    }
  }, []);

  const handleSwitch = () => {
    setShowSignup((prev) => !prev);
  };

  //   const handleCloseDialog = () => {
  //     setDialogOpen(false);
  //   };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  return (
    <>
      {!dialogOpen && !popoverOpen && (
        <div
          className="flex flex-col items-center gap-2 w-full cursor-pointer"
          onClick={handleDialogOpen}
        >
          <Image
            src={"/pikachu.png"}
            alt="Pikachu"
            width={2000}
            height={2000}
            className="w-[120px] h-[120px]"
          />
          <div className="flex relative w-[300px]">
            <div className="absolute left-0 top-0 w-10 h-10 z-20  rounded-full flex items-center justify-center">
              <Search size={16} color="#333" />
            </div>
            <Input
              placeholder="Асуух зүйл байна уу?"
              className="pl-10 absolute left-0 top-0 w-full h-10 rounded-full bg-[#f6f6f6] text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[906px] h-[618px] py-5 px-8 flex flex-col rounded-8">
          {isLoggedIn ? (
            <GeneralTab
              minimize={() => {
                setDialogOpen(false);
                setPopoverOpen(true);
              }}
            />
          ) : showSignup ? (
            <Signup onSwitch={handleSwitch} />
          ) : (
            <Login
              onSwitch={handleSwitch}
              onLoginSuccess={() => setIsLoggedIn(true)} // ⬅️ дамжуулна
            />
          )}
        </DialogContent>
        <DialogHeader></DialogHeader>
        <DialogTitle></DialogTitle>
      </Dialog>

      {popoverOpen && (
        <div className="fixed bottom-4 right-4 z-50 bg-white rounded-xl shadow-lg p-4 w-[350px] relative">
          <div className="flex justify-end items-center gap-2">
            <button
              className="cursor-pointer"
              onClick={() => {
                setPopoverOpen(false);
                setDialogOpen(true);
              }}
            >
              <Expand />
            </button>
            <button
              onClick={() => {
                setPopoverOpen(false);
              }}
              className="text-black hover:text-black"
            >
              <ChevronDown size={24} />
            </button>
          </div>

          <Questions userName={userName} />
        </div>
      )}
    </>
  );
}
