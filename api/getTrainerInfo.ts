import { sendRequest } from "@/app/api/rootApi";
import { TrainerInfoRes } from "@/types/api.type";
import { useSuspenseQuery } from "@tanstack/react-query";

interface GetTrainerInfoRequest {
  trainerId: number;
}

const getTrainerInfo = (
  request: GetTrainerInfoRequest,
): Promise<TrainerInfoRes> =>
  sendRequest<TrainerInfoRes>(`trainer/info/${request.trainerId}`, "get");

export const useTrainerInfoQuery = (params: GetTrainerInfoRequest) => {
  return useSuspenseQuery({
    queryKey: ["trainerInfo", params.trainerId],
    queryFn: async () => {
      const result = await getTrainerInfo(params);
      return result;
    },
  });
};

export default getTrainerInfo;
