"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import Image from "next/image";
import GeneralTab from "./GeneralTab";
import { useState } from "react";
import Questions from "./chat/Question";
import Login from "./auth/login";
import Signup from "./auth/signup";

export default function AvatarSearch() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [showSignup, setShowSignup] = useState(false);

  const handleSwitch = () => {
    setShowSignup((prev) => !prev);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {/* Dialog Trigger харагдах нөхцөл */}
      {!dialogOpen && !popoverOpen && (
        <div
          className="flex flex-col items-center gap-2 w-full cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <div className="flex justify-start w-full mb-4">
            <span className="text-white bg-red-600 rounded-full px-2">1</span>
          </div>
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

      {/* Dialog нээгдэнэ */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className=" sm:max-w-[906px] w-full h-[618px]">
          {/* <GeneralTab
            minimize={() => {
              setDialogOpen(false);
              setPopoverOpen(true);
            }}
          /> */}
          {showSignup ? (
            <Signup onSwitch={handleSwitch} />
          ) : (
            <Login onSwitch={handleSwitch} />
          )}
        </DialogContent>
        <DialogHeader></DialogHeader>
        <DialogTitle></DialogTitle>
      </Dialog>

      {popoverOpen && (
        <div className="fixed bottom-4 right-4 z-50 bg-white rounded-xl shadow-lg p-4 w-[350px]">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => {
                setPopoverOpen(false);
              }}
              className="text-gray-400 hover:text-black"
            >
              <X size={16} />
            </button>
          </div>
          <Questions />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-full w-full"
            onClick={() => {
              setPopoverOpen(false);
              setDialogOpen(true);
            }}
          >
            Буцааж нээх
          </button>
        </div>
      )}
    </>
  );
}
