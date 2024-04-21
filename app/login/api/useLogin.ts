"use client";
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
      setCookie("token", response.token);

      router.replace("/");

      /*
      setTimeout(() => {
        location.reload();
      }, 1000);*/

      router.refresh();
    },
    onError(error) {
      if (error.message) {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
      console.log("error", error);
    },
  });
};
