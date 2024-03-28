"use client";
import EstimateTrainerAtom from "./EstimateTrainerAtom";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useUserLocation } from "@/store/useUserLocation";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { EstimateItemAtom, EstimateItem } from "../../types";

interface EstimatesU {
  pageParam: number | undefined;
  queryKey: Array<string>;
}
export const fetchInfiniteEstimateU = async ({
  pageParam,
  queryKey,
}: EstimatesU) => {
  const [, location] = queryKey;
  if (typeof pageParam === "number") {
    return await sendRequest(
      `trainer/estimates?courseId=${pageParam}&size=5&ptAddress=${location}`,
      "get",
    );
  }
};
export default function EstimateTrainerList() {
  const [count, setCount] = useState(0);
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
        fetchInfiniteEstimateU({
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
      setCount(count + 1);
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
