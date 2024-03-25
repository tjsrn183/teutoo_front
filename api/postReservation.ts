import { sendRequest } from "@/app/api/rootApi";
import { RequestReservationRes } from "@/types/api.type";

export interface PostReservationRequest {
  startTime: string;
  endTime: string;
  programId: number;
}

const postReservation = (request: PostReservationRequest) =>
  sendRequest<RequestReservationRes>(
    "trainer/program/reservation",
    "post",
    request,
  );

export default postReservation;
