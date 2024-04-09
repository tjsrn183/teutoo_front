"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import BlankEstimate from "./BlankEstimate";
import { getEstimates } from "../../types";
import { getMyEstimateU } from "../../api/getMtEstimateU";
import MyEstimateCard from "./MyEstimateCard";

export interface MyEstimatePropsU {
  data: {
    estimateId: number;
    name: string;
    price: number;
    ptAddress: string;
  };
}

export default function MyEstimateT() {
  const queryClient = useQueryClient();
  const trainerEstimates: getEstimates | undefined | null =
    queryClient.getQueryData(["trainerEstimates"]);

  const { data, isLoading } = useQuery<MyEstimatePropsU>({
    queryKey: ["myEstimateU"],
    queryFn: getMyEstimateU(trainerEstimates?.pages[0].myEstimateId),
    enabled: !!trainerEstimates?.pages[0].myEstimateId,
  });

  return (
    <div className="">
      {data?.data ? <MyEstimateCard data={data} /> : <BlankEstimate />}
    </div>
  );
}
