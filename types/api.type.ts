export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface ImgResDto {
  imgName: string;
  imgUrl: string;
}

export interface LocalTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface TrainerListRes {
  content: {
    trainerInfoId: number;
    trainerName: string;
    gymName: string;
    simpleIntro: string;
    imgResDto: ImgResDto | null;
    reviewCnt: number;
    reviewScore: number;
  }[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface TrainerInfoRes {
  trainerInfoId: number;
  trainerName: string;
  imgResDto: ImgResDto | null;
  trainerAddress: string;
  gymName: string;
  simpleIntro: string;
  introContent: string;
  careerImgList: ImgResDto[];
  ptProgramResDtoList: {
    ptProgramId: number;
    title: string;
    content: string;
    price: number;
    availableStartTime: string | null;
    availableEndTime: string | null;
    ptProgramImgList: ImgResDto[];
  }[];
  reviewCnt: number;
  reviewScore: number;
}

export interface ProgramInfoRes {
  trainerId: number;
  title: string;
  content: string;
  price: number;
  availableStartTime: string | null;
  availableEndTime: string | null;
  ptProgramImgList: ImgResDto[];
}

export interface LoginUserInfoRes {
  data: {
    memberId: number;
    name: string;
    address: string;
    profileImagePath: string | null;
    profileImageName: string | null;
    email: string;
    setRole: "USER" | "TRAINER";
  };
}

export type Message = SendMessage | ReadMessage;

export type SendMessage =
  | SendTextMessage
  | SendImageMessage
  | SendReservationMessage
  | SendReservationAcceptMessage
  | SendMemberReservationMessage
  | SendTrainerReservationMessage;

export interface ReadMessage {
  msgAction: "READ";
  senderId: number;
  senderIdx: number;
  receiverId: number;
  receiverIdx: number;
}

interface SendMessageBase {
  msgAction: "SEND";
  msgIdx: number;
  createdAt: string;
  senderId: number;
  content: string;
}

export interface SendTextMessage extends SendMessageBase {
  contentType: "TEXT";
}

export interface SendImageMessage extends SendMessageBase {
  contentType: "IMG";
}

export interface SendReservationMessage extends SendMessageBase {
  contentType: "RESERVATION";
}

type ReservationStatus = "PENDING" | "RESERVED" | "CANCELED";
export interface SendReservationMessageContent {
  reservationId: number;
  programId: number;
  memberId: number;
  memberName: string;
  trainerId: number;
  trainerName: string;
  programName: string;
  startDateTime: string;
  endDateTime: string;
  status: ReservationStatus;
}

export interface SendReservationAcceptMessage extends SendMessageBase {
  contentType: "RESERVATION_ACCEPT";
  content: string;
}

export interface SendMemberReservationMessage extends SendMessageBase {
  contentType: "RESERVATION_REQ_MEMBER";
  content: string;
}
export interface SendMemberReservationMessageContent {
  programName: string;
  price: number;
  address: string;
}

export interface SendTrainerReservationMessage extends SendMessageBase {
  contentType: "RESERVATION_REQ_TRAINER";
  content: string;
}

export interface SendTrainerReservationMessageContent {
  price: number;
  address: string;
}

export interface ChatList {
  memberId: number;
  name: string;
  profileImgUrl: string;
  latestChat: SendMessage;
  unReadChatCnt: number;
}

export type ChatListRes = ChatList[];

export interface ChatRoomRes {
  roomId: string;
  senderIdx: number;
  receiverIdx: number;
  messages: SendMessage[];
  receiverImg: ImgResDto | null;
}

export interface RequestReservationRes {
  reservationId: number;
}

export interface ReservationConfirmRes {
  reservationId: number;
}

export interface MemberSchedule {
  trainerId: number;
  trainerName: string;
  imgResDto: ImgResDto | null;
  programId: number;
  programName: string;
  startDateTime: string;
  endDateTime: string;
  status: ReservationStatus;
}

export type MemberScheduleRes = MemberSchedule[];
