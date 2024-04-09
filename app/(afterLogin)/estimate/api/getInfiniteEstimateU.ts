import { sendRequest } from "@/app/api/rootApi";
interface EstimatesU {
  pageParam: number | undefined;
  queryKey: Array<string>;
}
export const getInfiniteEstimateU = async ({
  pageParam,
  queryKey,
}: EstimatesU) => {
  const [, location] = queryKey;
  if (typeof pageParam === "number") {
    return await sendRequest(
      `trainer/estimates?courseId=${pageParam}&size=5&ptAddress=${location}`,
      "get",
    );
  }
};
