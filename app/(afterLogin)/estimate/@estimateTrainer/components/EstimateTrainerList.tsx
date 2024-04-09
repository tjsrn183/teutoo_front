"use client";
import EstimateTrainerAtom from "./EstimateTrainerAtom";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useUserLocation } from "@/store/useUserLocation";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { EstimateItemAtom, EstimateItem } from "../../types";
import { getInfiniteEstimateU } from "../../api/getInfiniteEstimateU";

export default function EstimateTrainerList() {
  const { location, setLocation } = useUserLocation();
  const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery<
      EstimateItem,
      Object,
      InfiniteData<EstimateItem>,
      Array<string>,
      number
    >({
      queryKey: ["userEstimates", location],
      queryFn: ({ pageParam }) =>
        getInfiniteEstimateU({
          pageParam,
          queryKey: ["userEstimates", location],
        }),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data[lastPage.data.length - 1]?.estimateId) {
          return lastPage?.data[lastPage.data.length - 1].estimateId;
        } else {
          return undefined;
        }
      },
      initialPageParam: 0,
    });
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 0,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col">
      {data?.pages.map((page: EstimateItem, pageIndex) =>
        page.data.map((innerpage: EstimateItemAtom, itemIndex) => (
          <EstimateTrainerAtom
            data={innerpage}
            key={`estimate-${pageIndex}-${itemIndex}`}
          />
        )),
      )}
      <div ref={ref} className="h-[50px]"></div>
    </div>
  );
}
