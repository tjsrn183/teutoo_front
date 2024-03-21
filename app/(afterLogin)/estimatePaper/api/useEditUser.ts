import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useRouter } from "next/navigation";

interface EditEstimate {
  data: FormData;
  id: number;
}
export const useEditUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ data, id }: EditEstimate) => {
      const response = await sendRequest(
        `user/estimates/${id}?price=${data.get("price")}&ptAddress=${data.get(
          "ptAddress",
        )}
      `,
        "patch",
      );
      return response;
    },
    onSuccess(response) {
      console.log("response다아아", response);
      router.replace("/");
      setTimeout(() => {
        alert("견적서 수정이 완료되었습니다.");
      }, 1000);
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
