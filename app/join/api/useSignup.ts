import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { sendRequest } from "@/app/api/rootApi";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: FormData) => {
      return await axios.post("http://43.201.184.37/join", data, {
        withCredentials: true,
      });
    },
    async onSuccess(response) {
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
