import { sendRequest } from "@/app/api/rootApi";
import { ChatListRes, ChatRoomRes } from "@/types/api.type";
import { useSuspenseQuery } from "@tanstack/react-query";

interface CommonType {
  receiverId: number;
}

interface InfoType extends CommonType {
  activationType: "INFO";
}

interface MemberReserveType extends CommonType {
  activationType: "MEMBER_RESERVE";
  price: number;
  programId: number;
  address: string;
}

interface TrainerReserveType extends CommonType {
  activationType: "TRAINER_RESERVE";
  price: number;
  address: string;
}

type getChatRoomRequest = InfoType | MemberReserveType | TrainerReserveType;

const getChatRoom = ({ receiverId, ...params }: getChatRoomRequest) =>
  sendRequest<ChatRoomRes>(`chat/activation/${receiverId}`, "post", params);

export const useChatRoomQuery = (params: getChatRoomRequest) => {
  return useSuspenseQuery({
    queryKey: ["chatRoom"],
    queryFn: () => getChatRoom(params),
  });
};

export default getChatRoom;
