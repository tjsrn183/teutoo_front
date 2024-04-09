"use client";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useSubmitUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await sendRequest(`user/estimates`, "post", data);
      return response;
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["myEstimateU"] });
      console.log("response다아아", response);
      router.replace("/");
      setTimeout(() => {
        alert("견적서 작성이 완료되었습니다.");
      }, 1000);
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
