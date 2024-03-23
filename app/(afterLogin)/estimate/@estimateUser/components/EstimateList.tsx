"use client";
import {
  EstimateItemAtom,
  EstimateItemT,
  fetchInfiniteEstimateT,
  getTrainerEstimates,
} from "../layout";
import EstimateUserAtom from "./EstimateUserAtom";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function EstimateList() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    EstimateItemT,
    Object,
    InfiniteData<EstimateItemT>,
    Array<string>,
    number
  >({
    queryKey: ["trainerEstimates"],
    queryFn: fetchInfiniteEstimateT,
    initialPageParam: 0,
    getNextPageParam: (lastPage: EstimateItemT) => {
      if (lastPage?.data[lastPage.data.length - 1]?.estimateId) {
        return lastPage?.data[lastPage.data.length - 1].estimateId;
      } else {
        return undefined;
      }
    },
  });
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 0,
  });
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  return (
    <div className=" flex flex-col">
      {data?.pages.map((page: EstimateItemT, pageIndex) =>
        page.data.map((innerpage: EstimateItemAtom, itemIndex) => (
          <EstimateUserAtom
            data={innerpage}
            key={`estimate-${pageIndex}-${itemIndex}`}
          />
        )),
      )}
      <div ref={ref} className=" h-[10px]"></div>
    </div>
  );
}
