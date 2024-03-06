import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";

export const useMyInfo = () => {
  return useMutation({
    mutationFn: async () => {
      const response = sendRequest("members/me", "get");
      return response;
    },
    onSuccess(response) {
      console.log("response다앙", response);
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
