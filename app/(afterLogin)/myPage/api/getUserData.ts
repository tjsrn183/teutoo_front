import { sendRequest } from "@/app/api/rootApi";
export const getUserData = async () => {
  return await sendRequest("members/me", "get");
};
