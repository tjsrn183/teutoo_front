import { sendRequest } from "@/app/api/rootApi";
import { RequestReservationRes } from "@/types/api.type";

export interface PostChatImageRequest {
  roomId: string;
  chatImgMsgList: File[];
}

const postChatImage = (request: PostChatImageRequest) =>
  sendRequest<RequestReservationRes>(
    `chat/${request.roomId}/img`,
    "post",
    request,
  );

export default postChatImage;
