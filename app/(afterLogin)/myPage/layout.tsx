"use client";
import { useQueryClient } from "@tanstack/react-query";
import { UserDataType } from "./@trainerMyPage/components/MyInfoChunk";
import { ReactNode } from "react";
interface MypageProps {
  account: ReactNode;
  trainerMyPage: ReactNode;
}
export default function AccountLayout({ account, trainerMyPage }: MypageProps) {
  const queryClient = useQueryClient();
  const data: UserDataType | undefined = queryClient.getQueryData(["userData"]);
  return <>{data?.data.setRole === "TRAINER" ? trainerMyPage : account}</>;
}
