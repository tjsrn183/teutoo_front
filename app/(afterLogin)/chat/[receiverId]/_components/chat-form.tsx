"use client";
import { Plus, SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import ChatImageButton from "./chat-menu/chat-image-button";
import ChatReservationButton from "./chat-menu/chat-reservation-button";
import { Toggle } from "@/components/common/toggle";
import { cn } from "@/lib/utils/tailwind.utils";
import Button from "@/components/common/button";
import { PostReservationRequest } from "@/api/postReservation";
import { useChatContext } from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-client";

interface ChatFormProps {}

export default function ChatForm({}: ChatFormProps): JSX.Element {
  const { sendTextMessage } = useChatContext();
  const [inputText, setInputText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendTextMessage(inputText);
    }
  };

  const handleClickSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleSendTextMessage(inputText);
  };

  const handleSendTextMessage = (message: string) => {
    if (message.trim() !== "") {
      sendTextMessage(message);
      setInputText("");
    }
  };

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
        <input
          className="flex-auto bg-transparent"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDownEnter}
        />
        <Button
          circle
          className="text-neutral-500"
          size="icon"
          variant="ghost"
          onClick={handleClickSend}
        >
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
