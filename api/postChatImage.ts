import { sendRequest } from "@/app/api/rootApi";
import { RequestReservationRes } from "@/types/api.type";

export interface PostChatImageRequest {
  roomId: string;
  chatImgMsgList: File[];
}

const postChatImage = (request: PostChatImageRequest) => {
  const form = new FormData();
  request.chatImgMsgList.forEach((file) => {
    form.append("chatImgMsgList", file);
  });
  form.append("roomId", request.roomId);

  sendRequest<RequestReservationRes>(
    `chat/${request.roomId}/img`,
    "post",
    form,
  );
};

export default postChatImage;
