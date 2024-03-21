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
import { useEditUser } from "../api/useEditUser";
import { useEffect, useState } from "react";
import { MyEstimatePropsU } from "../../estimateUser/components/MyEstimate";

export default function EstimateFormUser() {
  const [exist, setExist] = useState<number>();
  const queryClient = useQueryClient();
  const data: UserDataType | undefined = queryClient.getQueryData(["userData"]);
  const myData: MyEstimatePropsU | undefined = queryClient.getQueryData([
    "myEstimateU",
  ]);

  const postMutation = useSubmitUser();
  const editMutaition = useEditUser();
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

    if (!exist) {
      postMutation.mutate(formdata);
    } else if (exist) {
      editMutaition.mutate({ data: formdata, id: exist });
    }
  };
  useEffect(() => {
    if (myData?.data.estimateId) {
      setExist(myData?.data.estimateId);
    }
  }, []);
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
