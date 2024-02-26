import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { JoinFormData } from "../../join/components/JoinForm";

export const useEditInfo = () => {
  return useMutation({
    mutationFn: async (data: JoinFormData) => {
      return await axios.post("http://43.201.184.37/editInfo", data, {
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
