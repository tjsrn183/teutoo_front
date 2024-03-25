import { sendRequest } from "@/app/api/rootApi";
import { LoginUserInfoRes } from "@/types/api.type";
import { useSuspenseQuery } from "@tanstack/react-query";

const getLoginUserInfo = (): Promise<LoginUserInfoRes> =>
  sendRequest<LoginUserInfoRes>("members/me", "get");

export const useLoginUserInfoQuery = () => {
  return useSuspenseQuery({
    queryKey: ["userData"],
    queryFn: getLoginUserInfo,
  });
};

export default getLoginUserInfo;
