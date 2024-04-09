import { sendRequest } from "@/app/api/rootApi";
import { TrainerListRes } from "@/types/api.type";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

interface GetTrainerListRequest {
  page: number;
  size: number;
  sort: "alpha" | "review";
  direction: "asc" | "desc";
  search?: string;
}

const getTrainerList = (
  request: GetTrainerListRequest,
): Promise<TrainerListRes> =>
  sendRequest<TrainerListRes>("/trainer/list", "get", request);

export const useTrainerListInfiniteQuery = (params: GetTrainerListRequest) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["trainerList", params],
    queryFn: async ({ pageParam }) => {
      const result = await getTrainerList({ ...params, page: pageParam });
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.last) {
        return undefined;
      }
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });
};

export default getTrainerList;
