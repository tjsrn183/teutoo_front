"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import BlankEstimate from "../../estimateUser/components/BlankEstimate";
import MyEstimateCardU from "./MyEstimateCardU";
import { sendRequest } from "@/app/api/rootApi";
import { useUserLocation } from "@/store/useUserLocation";
import { EstimateItemU, getUserEstimates } from "./EstimateTrainerList";
import { useEffect, useState } from "react";

export interface MyEstimatePropsT {
  data: {
    estimateId: number;
    name: string;
    price: number;
    ptAddress: string;
    ptProgram: { id: number; ptProgramName: string };
  };
}
const immeEstimateU = async () => {
  return await sendRequest(
    `trainer/estimates?page=0&size=5&sort=string&ptAddress=서울특별시`,
    "get",
  );
};
const fetchMyEstimateT = (id: number | undefined | null) => async () => {
  if (id) {
    return await sendRequest(`trainer/estimates/${id}`);
  }
};

export default function MyEstimateU() {
  const { location } = useUserLocation();
  const userDataT = useQuery<EstimateItemU>({
    queryKey: ["immeEstimateU"],
    queryFn: immeEstimateU,
    enabled: !!location,
  });
  const { data, isLoading, refetch } = useQuery<MyEstimatePropsT>({
    queryKey: ["myEstimateT"],
    queryFn: fetchMyEstimateT(userDataT.data?.myEstimateId),
    enabled: !!userDataT.data?.myEstimateId,
  });

  useEffect(() => {
    if (userDataT.data?.myEstimateId) {
      refetch();
    }
  }, [location, refetch]);

  return (
    <div className="">
      {data ? <MyEstimateCardU data={data.data} /> : <BlankEstimate />}
    </div>
  );
}
