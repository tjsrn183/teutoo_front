"use client";
import getChatRoom from "@/api/getChatRoom";
import Button from "@/components/common/button";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface RequestChatButtonProps {
  receiverId: number;
}

export default function RequestChatButton({
  receiverId,
}: RequestChatButtonProps) {
  const router = useRouter();
  const handleClick = async () => {
    const token = getCookie("token");
    if (!token) return alert("로그인이 필요합니다.");
    try {
      // const chatRoom = await getChatRoom({ receiverId });
      // console.log("chatRoom", chatRoom);
      router.push(`/chat/${receiverId}`);
    } catch (e) {
      alert("채팅방 정보를 가져오는데 실패했습니다.");
      console.log(e);
    }
  };

  return (
    <Button className="w-full" onClick={handleClick}>
      문의하기
    </Button>
  );
}
