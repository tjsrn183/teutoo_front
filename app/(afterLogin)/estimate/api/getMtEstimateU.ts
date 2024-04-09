import { sendRequest } from "@/app/api/rootApi";
export const getMyEstimateU = (id: number | undefined | null) => async () => {
  if (id) {
    return await sendRequest(`user/estimates/${id}`);
  }
};
