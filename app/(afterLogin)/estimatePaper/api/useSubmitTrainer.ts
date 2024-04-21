"use client";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
export const useSubmitTrainer = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await sendRequest(`trainer/estimates`, "post", data);
      return response;
    },
    onSuccess(response) {
      router.push("/");
      setTimeout(() => {
        location.reload();
      }, 500);
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
