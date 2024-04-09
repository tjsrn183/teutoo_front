import { cn } from "@/lib/utils/tailwind.utils";
import { SendTextMessage } from "@/types/api.type";

export default function TextMessage({
  message,
  isMe,
}: {
  message: SendTextMessage;
  isMe: boolean;
}) {
  const { content } = message;
  return (
    <div
      className={cn(
        "py-2 px-3 rounded-2xl",
        isMe ? "bg-green-500 text-white" : "bg-neutral-300",
      )}
    >
      {content}
    </div>
  );
}
