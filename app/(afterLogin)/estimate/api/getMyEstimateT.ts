import { sendRequest } from "@/app/api/rootApi";
export const getMyEstimateT = (id: number | undefined | null) => async () => {
  if (id) {
    return await sendRequest(`trainer/estimates/${id}`);
  }
};
