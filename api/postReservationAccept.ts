import { sendRequest } from "@/app/api/rootApi";
import { ReservationConfirmRes } from "@/types/api.type";

export interface PostReservationAcceptRequest {
  reservationId: number;
}

const postReservationAccept = (request: PostReservationAcceptRequest) =>
  sendRequest<ReservationConfirmRes>(
    "trainer/program/reservation/accept",
    "post",
    request,
  );

export default postReservationAccept;
