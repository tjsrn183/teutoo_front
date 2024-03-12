"use client";
import React from "react";
import { NumberButton } from "@/components/NumberButton";
import { Picture, PicturesElement } from "@/components/PicturesElement";
import TextArea from "@/components/formElement/TextArea";
import TextField from "@/components/formElement/TextField";
import { useState, forwardRef, useImperativeHandle } from "react";
import { TimePicker, ConfigProvider } from "antd";
import { Dayjs } from "dayjs";
import { RangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodProgramSchema } from "../zodProgramSchema";
import { useManageProgram } from "../api/useManageProgram";
import { useEditProgram } from "../api/useEditProgram";
import PictureExist from "@/app/(afterLogin)/introduceTrainer/components/PictureExist";
import { ImgType } from "@/app/(afterLogin)/introduceTrainer/components/IntroTrainerForm";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import close from "@/public/join/close.png";
import { useDeleteProgram } from "../api/useDeleteProgram";

export interface ProgramFormType {
  title: string;
  content: string;
  price: number;
  count: number;
  time?: [number, number];
  picture?: Picture[];
  ptProgramImgList?: ImgType[];
  ptProgramId?: number;
}
interface ProgramListProps {
  programList?: ProgramDataServer;
  fromServer?: boolean;
}
export interface ProgramDataServer extends ProgramFormType {
  ptCnt?: number;
  ptProgramId?: number;
  ptProgramResList?: Array<ProgramFormType>;
}
export const ProgramForm = forwardRef((props: ProgramListProps, ref) => {
  const [pictureArr, setPictureArr] = useState<Array<Picture>>([]);
  const [count, setCount] = useState(1);
  const setNewProgram = useManageProgram();
  const editProgram = useEditProgram();
  const [timeRange, setTimeRange] = useState<[number, number] | [null, null]>();
  const [deleteImg, setDeleteImg] = useState<string[]>([]);
  const deleteProgram = useDeleteProgram();
  const queryClient = useQueryClient();

  const data: ProgramDataServer | undefined = queryClient.getQueryData([
    "trainerProgram",
  ]);
  const imgArr =
    props.programList?.ptProgramId &&
    data?.ptProgramResList &&
    data?.ptProgramResList[props.programList.ptProgramId - 1]?.ptProgramImgList;
  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProgramFormType>({
    resolver: zodResolver(zodProgramSchema),
    defaultValues: {
      title: props.programList?.title ?? undefined,
      content: props.programList?.content ?? undefined,
      price: props.programList?.price ?? undefined,
      count: props.programList?.ptCnt ?? undefined,
      time: props.programList?.time ?? undefined,
    },
  });

  const handleRangeChange = (time: RangeValueType<Dayjs>) => {
    if (time && time[0] && time[1]) {
      setTimeRange([time[0].hour(), time[1].hour()]);
    } else {
      setTimeRange([null, null]);
    }
  };
  const onClickDeleteProgram = () => {
    if (props.programList?.ptProgramId) {
      deleteProgram.mutate(props.programList?.ptProgramId);
    }
  };
  // 폼을 제출하기 위한 함수
  const onSubmit = (data: ProgramFormType) => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("content", data.content);
    formdata.append("price", data.price.toString());
    formdata.append("ptCnt", count.toString());
    if (pictureArr) {
      pictureArr.forEach((picture) => {
        formdata.append("addPtImgList", picture.file);
      });
    }
    if (props.fromServer) {
      if (deleteImg.length > 0) {
        deleteImg.forEach((img) => {
          formdata.append("delPtImgList", img);
        });
      }
      editProgram.mutate({
        data: formdata,
        programId: props.programList?.ptProgramId,
      });
    } else {
      setNewProgram.mutate(formdata);
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <form
      className="flex flex-col border border-[#DDE1E6] m-2  rounded-[12px] p-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" relative">
        {props.fromServer && (
          <button
            type="button"
            onClick={onClickDeleteProgram}
            className=" absolute right-1"
          >
            <Image src={close} alt="close" />
          </button>
        )}
      </div>

      <TextField
        title="프로그램 제목을 입력해주세요"
        placeholder="제목을 입력하세요"
        register={{ ...register("title") }}
      />
      {errors.title && (
        <p className="text-red-600 font-bold">{errors.title.message}</p>
      )}
      <TextArea
        title="내용을 입력해주세요"
        placeholder="내용을 입력하세요"
        register={{ ...register("content") }}
      />
      {errors.content && (
        <p className="text-red-600 font-bold">{errors.content.message}</p>
      )}
      <TextField
        title="가격"
        placeholder="가격을 입력하세요"
        type="number"
        register={{ ...register("price") }}
        id="won"
      />
      {errors.price && (
        <p className="text-red-600 font-bold">{errors.price.message}</p>
      )}
      <div className=" my-2">
        <span className="text-sm font-semibold text-black">
          프로그램 가능 시간
        </span>
        <ConfigProvider
          theme={{
            components: {
              DatePicker: {
                activeBorderColor: "#22C55E",
                hoverBorderColor: "#22C55E",
              },
            },
          }}
        >
          <TimePicker.RangePicker
            format="HH"
            onChange={handleRangeChange}
            size="large"
            className=" w-full [&>*:nth-child(4)]:bg-[#22C55E]"
          />
        </ConfigProvider>
      </div>

      <label className="text-sm font-semibold text-black flex flex-col">
        횟수
        <NumberButton
          setCount={setCount}
          count={count}
          register={{ ...register("count") }}
          setValue={setValue}
          useReactHookForm
          watch={watch}
        />
      </label>
      {errors.count && (
        <p className="text-red-600 font-bold">{errors.count.message}</p>
      )}

      {imgArr ? (
        <PictureExist
          fetchImg={imgArr}
          setDeleteImg={setDeleteImg}
          fromWhere="ProgramManage"
          programId={props.programList?.ptProgramId}
        />
      ) : (
        <></>
      )}

      <PicturesElement pictureArr={pictureArr} setPictureArr={setPictureArr} />
    </form>
  );
});
ProgramForm.displayName = "ProgramForm";
