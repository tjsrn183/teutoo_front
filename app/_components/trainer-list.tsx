"use client";
import { useTrainerListInfiniteQuery } from "@/api/getTrainerList";
import Avatar from "@/components/common/avatar";
import List from "@/components/common/list";
import Star from "@/components/common/star";
import { MapPin } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface TrainerListProps {
  sort: "alpha" | "review";
  direction: "asc" | "desc";
  search?: string;
}

export default function TrainerList({
  sort,
  direction,
  search,
}: TrainerListProps): JSX.Element {
  const { ref, inView } = useInView();
  const { data, fetchNextPage } = useTrainerListInfiniteQuery({
    page: 0,
    size: 10,
    sort,
    direction,
    search,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
      console.log("fetchNextPage");
    }
  }, [inView, fetchNextPage]);

  return (
    <List className="mt-4 bg-white">
      {data.pages.map((page, i) =>
        page.content.map((trainer, j) => (
          <List.Item
            asChild
            className="flex gap-2"
            key={trainer.trainerInfoId}
            ref={
              i === data.pages.length - 1 && j === page.content.length - 1
                ? ref
                : undefined
            }
          >
            <Link href={`/trainer/${trainer.trainerInfoId}`}>
              <Avatar className="w-20 h-20" square>
                <Avatar.Image
                  alt="avatar"
                  src={trainer.imgResDto?.imgUrl || "/blank-profile.webp"}
                />
              </Avatar>
              <div className="flex flex-col flex-auto">
                <p className="font-medium">{`${trainer.trainerName}`}</p>

                <p className="text-sm">{trainer.simpleIntro}</p>
                <div className="inline-flex items-center text-neutral-500">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm text-neutral-500">{trainer.gymName}</p>
                </div>

                <div className="flex justify-between items-baseline">
                  <div className="inline-flex items-start gap-1">
                    <Star className="w-3.5 h-3.5" />
                    <span className="text-sm font-medium leading-4">
                      {trainer.reviewScore} ({trainer.reviewCnt})
                    </span>
                  </div>
                  {/* <p className="text-red-500 font-semibold ">
                    1회 {trainer.oneTimePrice}~{" "}
                  </p> */}
                </div>
              </div>
            </Link>
          </List.Item>
        )),
      )}
    </List>
  );
}
