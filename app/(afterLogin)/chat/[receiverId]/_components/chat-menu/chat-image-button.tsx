import { Image as ImageIcon } from "lucide-react";
import React from "react";

interface ChatImageButtonProps {
  onClick: (imgList: File[]) => void;
}

export default function ChatImageButton({
  onClick,
}: ChatImageButtonProps): JSX.Element {
  const handleSelectImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (file) {
        console.log(file);
        onClick([file]);
      }
    });
  };

  return (
    <button
      aria-label="이미지 선택"
      className="flex flex-col items-center justify-center rounded hover:bg-neutral-100"
      type="button"
      onClick={handleSelectImage}
    >
      <ImageIcon />
      <span>이미지</span>
    </button>
  );
}
