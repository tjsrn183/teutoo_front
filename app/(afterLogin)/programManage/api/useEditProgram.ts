import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useQueryClient } from "@tanstack/react-query";
interface EditProgram {
  data: FormData;
  programId?: number;
}
export const useEditProgram = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditProgram) => {
      const response = sendRequest(
        `trainer/program/${data.programId}`,
        "put",
        data.data,
      );
      return response;
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["trainerProgram"],
        refetchType: "all",
      });
      console.log("response다아아", response);
      router.replace("/");
      setTimeout(() => {
        alert("프로그램이 저장되었습니다..");
      }, 1000);

      console.log("쿼리무효화");
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
