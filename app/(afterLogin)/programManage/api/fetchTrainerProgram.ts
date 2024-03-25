import { sendRequest } from "@/app/api/rootApi";

export const fetchTrainerProgram = async () => {
  return await sendRequest("trainer/program/me", "get");
};
