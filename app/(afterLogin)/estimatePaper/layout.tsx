"use client";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { UserDataType } from "../trainerMyPage/components/MyInfoChunk";
export const metadata = {
  title: "견적서 작성",
  description: "견적서 작성",
};
interface RoleProps {
  trainer: ReactNode;
  user: ReactNode;
}

export default function EstimatePaperLayout({ trainer, user }: RoleProps) {
  const queryClient = useQueryClient();
  const data: UserDataType | undefined = queryClient.getQueryData(["userData"]);
  return (
    <div className=" h-screen">
      {data?.data.setRole === "TRAINER" ? trainer : user}
    </div>
  );
}
