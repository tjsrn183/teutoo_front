import { sendRequest } from "@/app/api/rootApi";
import { ChatListRes, LoginUserInfoRes } from "@/types/api.type";
import { useSuspenseQuery } from "@tanstack/react-query";

const getChatList = () => sendRequest<ChatListRes>("chat/list", "get");

export const useChatListQuery = () => {
  return useSuspenseQuery({
    queryKey: ["chatList"],
    queryFn: getChatList,
  });
};

export default getChatList;
