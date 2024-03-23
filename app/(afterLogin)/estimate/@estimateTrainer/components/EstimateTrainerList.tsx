"use client";
import EstimateTrainerAtom from "./EstimateTrainerAtom";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { useUserLocation } from "@/store/useUserLocation";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export interface getUserEstimates {
  pageParams: Array<number>;
  pages: Array<EstimateItemU>;
}
export interface EstimateItemU {
  data: EstimateItemAtom;
  myEstimateId: number | null;
  number: number;
}
interface EstimateItemAtom {
  content: Array<ContentArr>;
  pageable: { pageNumber: number };
}
export interface ContentArr {
  estimateId: number;
  price: number;
  name: string;
  profileImagePath: string | null;
}
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
      `trainer/estimates?page=${pageParam}&size=5&sort=string&ptAddress=${location}`,
      "get",
    );
  }
};
export default function EstimateTrainerList() {
  const [count, setCount] = useState(0);
  const { location, setLocation } = useUserLocation();
  const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery<
      EstimateItemU,
      Object,
      InfiniteData<EstimateItemU>,
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
        return lastPage.data.content.length > 0
          ? lastPage.data.pageable.pageNumber + 1
          : undefined;
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
      {data?.pages.map((page: EstimateItemU, pageIndex) =>
        page.data.content.map((innerpage: ContentArr, itemIndex) => (
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
