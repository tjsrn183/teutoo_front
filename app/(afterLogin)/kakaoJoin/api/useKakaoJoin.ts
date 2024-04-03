"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useQueryClient } from "@tanstack/react-query";

export const useKakaoJoin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await sendRequest("members/me", "patch", data);
      return response;
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      console.log("response다아아", response);
      router.replace("/");
      setTimeout(() => {
        alert("회원가입이 완료되었습니다.");
      }, 1000);
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
