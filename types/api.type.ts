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

interface LocalTime {
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
    availableStartTime: LocalTime | null;
    availableEndTime: LocalTime | null;
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
  availableStartTime: LocalTime | null;
  availableEndTime: LocalTime | null;
  ptProgramImgList: ImgResDto[];
}
