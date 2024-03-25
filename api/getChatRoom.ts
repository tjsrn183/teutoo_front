import { sendRequest } from "@/app/api/rootApi";
import { ChatListRes, ChatRoomRes } from "@/types/api.type";
import { useSuspenseQuery } from "@tanstack/react-query";

interface getChatRoomRequest {
  receiverId: number;
}

const getChatRoom = ({ receiverId }: getChatRoomRequest) =>
  sendRequest<ChatRoomRes>("chat/activation", "get", { receiverId });

export const useChatRoomQuery = ({ receiverId }: getChatRoomRequest) => {
  return useSuspenseQuery({
    queryKey: ["chatRoom"],
    queryFn: () => getChatRoom({ receiverId }),
  });
};

export default getChatRoom;
