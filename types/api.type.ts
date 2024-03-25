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

export interface SendMessage {
  msgAction: "SEND";
  msgIdx: number;
  contentType: "TEXT" | "IMG" | "RESERVATION";
  content: string;
  createdAt: string;
  senderId: number;
}

export interface ReadMessage {
  msgAction: "READ";
  senderId: number;
  senderIdx: number;
  receiverId: number;
  receiverIdx: number;
}

export interface ReservationMessageContent {
  reservationId: number;
  programId: number;
  memberId: number;
  memberName: string;
  trainerId: number;
  trainerName: string;
  programName: string;
  startDateTime: string;
  endDateTime: string;
  status: "PENDING" | "RESERVED";
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
}

export interface RequestReservationRes {
  reservationId: number;
}

export interface ReservationConfirmRes {
  reservationId: number;
}
