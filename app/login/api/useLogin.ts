import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { setCookie } from "cookies-next";
export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: URLSearchParams) => {
      const response = sendRequest("login", "post", data, {
        "Content-Type": "application/x-www-form-urlencoded",
      });
      return response;
    },
    onSuccess(response: { token: string }) {
      console.log("토큰을 찾아보자", response.token);
      setCookie("token", response.token);
      router.replace("/");
      console.log("로그인 됐다앙~", response);
      setTimeout(() => {
        alert("로그인이 완료되었습니다.");
      }, 1000);
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
