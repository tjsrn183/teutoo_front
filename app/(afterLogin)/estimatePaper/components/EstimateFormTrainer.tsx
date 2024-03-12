"use client";
import LightButton from "@/components/LightButton";
import TextField from "@/components/formElement/TextField";
import { useQueryClient } from "@tanstack/react-query";
import { UserDataType } from "../../trainerMyPage/components/MyInfoChunk";
import { SelectProgram } from "./SelectProgram";
import { useState } from "react";
import { useSubmitTrainer } from "../api/useSubmitTrainer";
import { FormEventHandler } from "react";

export default function EstimateFormTrainer() {
  const queryClient = useQueryClient();
  const data: UserDataType | undefined = queryClient.getQueryData(["userData"]);
  const setEstimate = useSubmitTrainer();
  const [price, setPrice] = useState<number | undefined>();
  const [address, setAddress] = useState<string | undefined>(
    data?.data.address,
  );
  const [programId, setProgramId] = useState<number | undefined>();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (price && address && programId) {
      formdata.append("price", price.toString());
      formdata.append("ptAddress", address);
      formdata.append("programId", programId.toString());
      setEstimate.mutate(formdata);
    } else {
      alert("모든항목을 작성해 주세요.");
    }
  };
  return (
    <form
      className=" w-full flex flex-col justify-center items-center text-black h-full"
      onSubmit={onSubmit}
    >
      <div className=" w-[80%] flex flex-col rounded-lg h-full justify-center">
        <div className="bg-white flex flex-col justify-center rounded-lg px-3 py-11">
          <TextField title="이름" disable data={data?.data.name} />
          <div className=" p-4" />
          <TextField
            title="가격"
            type="number"
            id="won"
            state={price}
            setState={setPrice}
          />
          <div className=" p-4" />
          <span className="text-sm font-semibold">프로그램 선택</span>
          <div className=" w-full h-full ">
            <SelectProgram setState={setProgramId} />
          </div>
          <div className=" p-4" />

          <TextField
            title="센터 위치"
            data={data?.data.address}
            state={address}
            setState={setAddress}
          />
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
