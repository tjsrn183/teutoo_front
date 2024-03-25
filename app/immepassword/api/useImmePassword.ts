import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useRouter } from "next/navigation";

export const useImmePassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: URLSearchParams) => {
      const response = await sendRequest(
        `password-reset-requests
      `,
        "post",
        data,
        {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      );
      return response;
    },
    onSuccess(response) {
      console.log("response다아아", response);
      router.replace("/");
      setTimeout(() => {
        alert("이메일로 임시 비밀번호를 보내드렸습니다.");
      }, 1000);
    },
    onError(error) {
      console.log("error", error);
      setTimeout(() => {
        alert("유효한 이메일을 입력하십시오.");
      }, 1000);
    },
  });
};
