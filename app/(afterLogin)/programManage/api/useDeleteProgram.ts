import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: number) => {
      const response = sendRequest(`trainer/program/${data}`, "delete");
      return response;
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["trainerProgram"] });

      window.location.reload();
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
