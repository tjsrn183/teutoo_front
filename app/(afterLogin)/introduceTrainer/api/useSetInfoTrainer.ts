"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useQueryClient } from "@tanstack/react-query";

export const useSetInfoTrainer = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = sendRequest("trainer/info", "post", data);
      return response;
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["trainerIntro"] });
      console.log("response다아아", response);
      router.replace("/");
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
