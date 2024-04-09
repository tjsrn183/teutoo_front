import { sendRequest } from "@/app/api/rootApi";
export const getScheduleT = async () => {
  return await sendRequest("schedule/trainer/me");
};
