"use client";

import {
  EstimateItemAtom,
  EstimateItemT,
  fetchInfiniteEstimateU,
  getTrainerEstimates,
} from "../layout";
import EstimateUserAtom from "./EstimateUserAtom";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
export default function EstimateList() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    getTrainerEstimates,
    Object,
    InfiniteData<EstimateItemT>,
    Array<string>,
    number
  >({
    queryKey: ["trainerEstimates"],
    queryFn: fetchInfiniteEstimateU,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.pageParams && lastPage?.pageParams[0] !== 0) {
        return lastPage?.pageParams[0] + 1;
      } else {
        return 0;
      }
    },
  });
  console.log("sdfsd", data);
  return (
    <div className=" flex flex-col">
      {data?.pages[0].data.map((page: EstimateItemAtom, i) => (
        <div key={i}>
          <EstimateUserAtom data={page} />
        </div>
      ))}
    </div>
  );
}
