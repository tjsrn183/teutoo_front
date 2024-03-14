"use client";

import LightButton from "@/components/LightButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodEstimatePaper } from "../zodEstimatePaper";
import { useQueryClient } from "@tanstack/react-query";
import { UserDataType } from "../../trainerMyPage/components/MyInfoChunk";
import { useSubmitUser } from "../api/useSubmitUser";
import { EstimateUserFormType } from "../zodEstimatePaper";
import CommonForm from "./CommonForm";

export default function EstimateFormUser() {
  const queryClient = useQueryClient();
  const data: UserDataType | undefined = queryClient.getQueryData(["userData"]);
  const mutation = useSubmitUser();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EstimateUserFormType>({
    resolver: zodResolver(zodEstimatePaper),
    defaultValues: {
      name: data?.data.name ?? undefined,
      address: data?.data.address ?? undefined,
    },
  });
  const onSubmit: (data: EstimateUserFormType) => void = (data) => {
    const formdata = new FormData();
    formdata.append("price", data.price.toString());
    formdata.append("ptAddress", data.address);
    formdata.append("ptCount", "11");
    mutation.mutate(formdata);
  };
  return (
    <form
      className=" w-[80%] flex flex-col justify-center items-center text-black h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-white flex flex-col px-4 rounded-md py-4">
        <CommonForm register={register} errors={errors} />
      </div>

      <LightButton
        backgroundColor="bg-[#175601]"
        type="submit"
        className=" mt-7"
      >
        신청서 작성완료
      </LightButton>
    </form>
  );
}
