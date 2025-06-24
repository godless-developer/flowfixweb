"use client";

import { useState } from "react";
import { useEffect } from "react";
import AvatarSearch from "./AvatarSearch";

export default function Pet() {
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
      <AvatarSearch />
    </div>
  );
}
