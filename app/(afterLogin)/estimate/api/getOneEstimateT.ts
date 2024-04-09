import { sendRequest } from "@/app/api/rootApi";
export const getOneEstimateT = (dataId: number) => async () => {
  let estimateT = null;

  if (dataId) {
    estimateT = await sendRequest(`trainer/estimates/${dataId}`);
  }
  return estimateT;
};
