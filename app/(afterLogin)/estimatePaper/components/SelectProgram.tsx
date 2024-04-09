"use client";
import React from "react";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { getOnlyTrainerPrograms } from "../api/getOnlyTrainerPrograms";

interface SelectProgramProps {
  setState?: React.Dispatch<React.SetStateAction<number | undefined>>;
}
interface Program {
  id: number;
  programName: string;
}

interface Trainer {
  name: string;
  programs: Program[];
}

interface DataWrapper {
  data: Trainer[];
}
export const SelectProgram = ({ setState }: SelectProgramProps) => {
  const { data }: { data: DataWrapper | undefined } = useQuery({
    queryKey: ["onlytrainerProgram"],
    queryFn: getOnlyTrainerPrograms,
  });

  const handleValueChange = (value: string) => {
    const ptProgramId = parseInt(value, 10);
    if (setState) {
      setState(ptProgramId);
    }
  };
  return (
    <Select.Root onValueChange={handleValueChange}>
      <Select.Trigger className="focus:outline-none pl-2 flex justify-between w-full text-[#697077] border border-[#d9d9d9] rounded-[12px] h-[38px]  items-center pr-4">
        <Select.Value placeholder="프로그램을 선택하세요" />
        <Select.Icon className="">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className=" bg-white drop-shadow-2xl rounded-[12px]">
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              {data?.data[0]?.programs.map((item, index) => {
                return (
                  <SelectItem value={item.id.toString()} key={index}>
                    {item.programName}
                  </SelectItem>
                );
              })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => {
    return (
      <Select.Item
        className=" flex justify-start pl-5 py-1"
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemIndicator className=" absolute left-1">
          <CheckIcon color="green" />
        </Select.ItemIndicator>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  },
);
SelectItem.displayName = "SelectItem";
