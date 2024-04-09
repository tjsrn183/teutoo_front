import { sendRequest } from "@/app/api/rootApi";

export const getOnlyTrainerPrograms = async () => {
  return await sendRequest("trainer/estimates/programs");
};
