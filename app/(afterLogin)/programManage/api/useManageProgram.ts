import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useQueryClient } from "@tanstack/react-query";

export const useManageProgram = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = sendRequest("trainer/program", "post", data);
      return response;
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["trainerProgram"] });
      console.log("response다아아", response);
      router.replace("/");
      setTimeout(() => {
        alert("프로그램이 저장되었습니다..");
      }, 1000);
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
