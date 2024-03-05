"use client";
import React from "react";
import { NumberButton } from "@/components/NumberButton";
import { Picture, PicturesElement } from "@/components/PicturesElement";
import TextArea from "@/components/formElement/TextArea";
import TextField from "@/components/formElement/TextField";
import { useState } from "react";
import { TimePicker, ConfigProvider } from "antd";
import { Dayjs } from "dayjs";
import { RangeValueType } from "rc-picker/lib/PickerInput/RangePicker";

export const ProgramForm = () => {
  const [count, setCount] = useState(1);
  const [pictureArr, setPictureArr] = useState<Array<Picture>>([]);
  const [timeRange, setTimeRange] = useState<[number, number] | [null, null]>();
  const handleRangeChange = (time: RangeValueType<Dayjs>) => {
    if (time && time[0] && time[1]) {
      console.log("time", time, [time[0].hour(), time[1].hour()]);
      setTimeRange([time[0].hour(), time[1].hour()]);
    } else {
      setTimeRange([null, null]);
    }
  };
  return (
    <form className="flex flex-col border border-[#DDE1E6] m-2  rounded-[12px] p-3">
      <TextField
        title="프로그램 제목을 입력해주세요"
        placeholder="제목을 입력하세요"
      />
      <TextArea title="내용을 입력해주세요" placeholder="내용을 입력하세요" />
      <TextField title="가격" placeholder="가격을 입력하세요" type="number" />
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
        <NumberButton setCount={setCount} count={count} />
      </label>
      <PicturesElement pictureArr={pictureArr} setPictureArr={setPictureArr} />
    </form>
  );
};
