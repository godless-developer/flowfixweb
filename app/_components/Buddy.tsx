"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const characters = [
  { name: "Pikachu", img: "/pikachu.png" },
  { name: "Fish", img: "/fish.png" },
  { name: "Plant", img: "/plant.gif" },
  { name: "Capybara", img: "/capybara.png" },
  { name: "Frog", img: "/frog.png" },
];

export default function Buddy() {
  const [selectedCharacter, setSelectedCharacter] = useState(0);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setSelectedCharacter(Math.max(0, selectedCharacter - 1))
            }
            disabled={selectedCharacter === 0}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-[158px] h-[158px] rounded-full overflow-hidden flex items-center justify-center bg-white">
              <Image
                src={characters[selectedCharacter].img}
                alt={characters[selectedCharacter].name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <div className="flex w-[174px] px-[40px] py-[12px] items-center gap-[10px] rounded-[8px] border border-[#C6C6C6] bg-[rgba(246,246,246,0.80)]">
              <p className="w-[94px] text-[#000] text-center text-[20px] font-[510] leading-normal">
                {characters[selectedCharacter].name}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setSelectedCharacter(
                Math.min(characters.length - 1, selectedCharacter + 1)
              )
            }
            disabled={selectedCharacter === characters.length - 1}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
