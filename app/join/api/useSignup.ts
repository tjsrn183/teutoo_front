import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: FormData) => {
      sendRequest("join", "post", data);
    },
    onSuccess(response) {
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
