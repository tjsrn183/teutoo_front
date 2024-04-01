import { sendRequest } from "@/app/api/rootApi";
import { MemberScheduleRes } from "@/types/api.type";
import { useSuspenseQuery } from "@tanstack/react-query";

const getUserSchedule = () =>
  sendRequest<MemberScheduleRes>("schedule/member/me", "get");

export const useUserScheduleQuery = () => {
  return useSuspenseQuery({
    queryKey: ["schedule"],
    queryFn: getUserSchedule,
  });
};

export default getUserSchedule;
