import { sendRequest } from "@/app/api/rootApi";
import { ProgramInfoRes } from "@/types/api.type";
import { useSuspenseQuery } from "@tanstack/react-query";

interface GetProgramInfoRequest {
  programId: number;
}

const getProgramInfo = (
  request: GetProgramInfoRequest,
): Promise<ProgramInfoRes> =>
  sendRequest<ProgramInfoRes>(`trainer/program/${request.programId}`, "get");

export const useProgramInfoQuery = (params: GetProgramInfoRequest) => {
  return useSuspenseQuery({
    queryKey: ["program", params.programId],
    queryFn: async () => {
      const result = await getProgramInfo(params);
      return result;
    },
  });
};

export default getProgramInfo;
