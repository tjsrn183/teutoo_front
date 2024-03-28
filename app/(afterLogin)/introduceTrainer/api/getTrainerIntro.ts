import { sendRequest } from "@/app/api/rootApi";
export const getTrainerIntro = async () => {
  return await sendRequest("trainer/info/me", "get");
};
