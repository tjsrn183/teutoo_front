"use client";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { UserDataType } from "../trainerMyPage/components/MyInfoChunk";
import BottomNavigationBar from "@/components/BottomNavigationBar";
interface RoleProps {
  estimateTrainer: ReactNode;
  estimateUser: ReactNode;
}

export default function EstimateLayout({
  estimateTrainer,
  estimateUser,
}: RoleProps) {
  const queryClient = useQueryClient();
  const data: UserDataType | undefined = queryClient.getQueryData(["userData"]);
  return (
    <div className=" h-screen">
      {data?.data.setRole === "TRAINER" ? estimateTrainer : estimateUser}
      <BottomNavigationBar />
    </div>
  );
}
