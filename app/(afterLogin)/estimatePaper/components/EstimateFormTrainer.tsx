"use client";
import LightButton from "@/components/LightButton";
import { useQueryClient } from "@tanstack/react-query";
import { UserDataType } from "../../trainerMyPage/components/MyInfoChunk";
import { SelectProgram } from "./SelectProgram";
import { useState } from "react";
import { useSubmitTrainer } from "../api/useSubmitTrainer";
import { EstimateUserFormType } from "../zodEstimatePaper";
import { zodEstimatePaper } from "../zodEstimatePaper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonForm from "./CommonForm";

export default function EstimateFormTrainer() {
  const queryClient = useQueryClient();
  const data: UserDataType | undefined = queryClient.getQueryData(["userData"]);
  const setEstimate = useSubmitTrainer();
  const [programId, setProgramId] = useState<number | undefined>();
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
  const onSubmit = (data: EstimateUserFormType) => {
    const formdata = new FormData();
    if (programId) {
      formdata.append("price", data.price.toString());
      formdata.append("ptAddress", data.address);
      formdata.append("programId", programId.toString());
      setEstimate.mutate(formdata);
    } else {
      alert("프로그램을 선택해주세요");
    }
  };
  return (
    <form
      className=" w-full flex flex-col justify-center items-center text-black h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" w-[80%] flex flex-col rounded-lg h-full justify-center">
        <div className="bg-white flex flex-col justify-center rounded-lg px-3 py-11">
          <CommonForm register={register} errors={errors} />
          <span className="text-sm font-semibold">프로그램 선택</span>
          <div className=" w-full h-full ">
            <SelectProgram setState={setProgramId} />
          </div>
          <div className=" p-4" />
        </div>
      </div>

      <div className="  sticky bottom-4 flex justify-center w-full">
        <LightButton
          backgroundColor="bg-[#175601]"
          type="submit"
          width="w-[85%]"
        >
          견적서 작성완료
        </LightButton>
      </div>
    </form>
  );
}
