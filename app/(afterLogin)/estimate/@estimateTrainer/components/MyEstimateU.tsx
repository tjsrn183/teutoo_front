"use client";

import { useQuery } from "@tanstack/react-query";
import BlankEstimate from "../../@estimateUser/components/BlankEstimate";
import MyEstimateCardU from "./MyEstimateCardU";
import { sendRequest } from "@/app/api/rootApi";
import { useUserLocation } from "@/store/useUserLocation";
import { useEffect } from "react";
import { EstimateItem } from "../../types";
import { getImmeEstimateU } from "../../api/getImmeEstimateU";
import { getMyEstimateT } from "../../api/getMyEstimateT";

export interface MyEstimatePropsT {
  data: {
    estimateId: number;
    name: string;
    price: number;
    ptAddress: string;
    ptProgram: { id: number; ptProgramName: string };
  };
}

export default function MyEstimateU() {
  const { location } = useUserLocation();

  const userDataT = useQuery<EstimateItem>({
    queryKey: ["immeEstimateU"],
    queryFn: getImmeEstimateU,
    enabled: !!location,
  });
  const { data, isLoading, refetch } = useQuery<MyEstimatePropsT>({
    queryKey: ["myEstimateT"],
    queryFn: getMyEstimateT(userDataT.data?.myEstimateId),
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
