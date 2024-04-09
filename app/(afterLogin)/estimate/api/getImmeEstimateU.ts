import { sendRequest } from "@/app/api/rootApi";
export const getImmeEstimateU = async () => {
  return await sendRequest(
    `trainer/estimates?courseId=0&size=5&ptAddress=서울특별시`,
    "get",
  );
};
