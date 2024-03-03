"use client";
import { Plus, SendHorizonal } from "lucide-react";
import React from "react";
import ChatImageButton from "./chat-menu/chat-image-button";
import ChatReservationButton from "./chat-menu/chat-reservation-button";
import { Toggle } from "@/components/common/toggle";
import { cn } from "@/lib/utils/tailwind.utils";
import Button from "@/components/common/button";

export default function ChatForm(): JSX.Element {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="bg-white p-2 pb-3 border-t border border-neutral-200">
      <div className="rounded-full bg-neutral-200 flex">
        <Toggle
          aria-label="Toggle Message Menu"
          onPressedChange={setMenuOpen}
          pressed={menuOpen}
        >
          <Plus
            className={cn(
              "transform transition-transform",
              menuOpen ? "rotate-45" : "rotate-0",
            )}
          />
        </Toggle>
        <input className="flex-auto bg-transparent" />
        <Button circle className="text-neutral-500" size="icon" variant="ghost">
          <SendHorizonal />
        </Button>
      </div>
      {menuOpen ? (
        <div className="h-40 grid-cols-4 grid-rows-2 grid gap-4 mt-4">
          <ChatImageButton />
          <ChatReservationButton />
        </div>
      ) : null}
    </div>
  );
}
