import ImagePreview from "@/components/ImagePreview";
import { cn } from "@/lib/utils/tailwind.utils";
import { SendImageMessage } from "@/types/api.type";
import Image from "next/image";

export default function ImageMessage({
  message,
  isMe,
}: {
  message: SendImageMessage;
  isMe: boolean;
}) {
  return (
    <div
      className={cn(
        "py-2 px-3 rounded-2xl",
        isMe ? "bg-green-500 text-white" : "bg-neutral-300",
      )}
    >
      <ImagePreview
        src={message.content}
        alt="chat image"
        width={160}
        height={160}
      />
    </div>
  );
}
