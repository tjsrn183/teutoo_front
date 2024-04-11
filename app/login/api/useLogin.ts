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
      console.log("웅답", response);
      setCookie("token", response.token);

      router.replace("/");
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
