"use client";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
interface EditEstimate {
  data: URLSearchParams;
  id: number;
}
export const useEditTrainer = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: EditEstimate) => {
      const response = await sendRequest(
        `trainer/estimates/${id}
      `,
        "patch",
        data,
        {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      );
      return response;
    },
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["myEstimateT"],
        refetchType: "all",
      });
      console.log("response다아아", response);
      router.replace("/");
      setTimeout(() => {
        alert("견적서 수정이 완료되었습니다.");
      }, 1000);
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
