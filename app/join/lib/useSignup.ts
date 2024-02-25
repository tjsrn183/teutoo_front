import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { JoinFormData } from "../components/JoinForm";

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: JoinFormData) => {
      return await axios.post("http://43.201.184.37/join", data, {
        withCredentials: true,
      });
    },
    async onSuccess(response) {
      console.log("response", response);
    },
    onError(error) {
      console.log("error", error);
    },
  });
};

//http://43.201.184.37/join
//http://43.201.184.37/join?name=hwnagseongu&email=teotuu@naver.com&password=123456&address=seoggusldjfkjsd&sortRole=false
