"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import AdminTab from "./AdminTab";
import Image from "next/image";

export default function AdminSet() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateInitialPosition = () => {
      const containerWidth = 472;
      const containerHeight = 360;
      const x = window.innerWidth - containerWidth - 20;
      const y = window.innerHeight - containerHeight - 20;
      setPosition({ x, y });
    };

    updateInitialPosition();
    window.addEventListener("resize", updateInitialPosition);

    return () => window.removeEventListener("resize", updateInitialPosition);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      className="w-[472px] h-[360px] rounded-lg flex flex-col gap-4 items-center justify-center p-20 "
    >
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <div className="flex flex-col gap-4">
              <Image
                src={"/pikachu.png"}
                alt="Pikachu"
                width={2000}
                height={2000}
                className="w-[120px] h-[120px]"
              />
              <div className="bg-[#f6f6f6] w-full rounded-full py-2 flex justify-center items-center">
                <Settings color="#333" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[906px] w-full h-[618px]">
            <AdminTab />
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="submit"
                className="rounded-[24px] px-8 py-4 bg-[#684DFF] cursor-pointer"
              >
                Болсон
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
