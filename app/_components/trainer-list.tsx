"use client";
import Avatar from "@/components/common/avatar";
import List from "@/components/common/list";
import Star from "@/components/common/star";
import { MapPin } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Trainer {
  id: number;
  name: string;
  desc: string;
  center: string;
  reviews: number;
  reviewScore: number;
  oneTimePrice: number;
}

export default function TrainerList(): JSX.Element {
  const { ref, inView } = useInView();
  const [pages, setPages] = useState<Trainer[][]>(
    Array.from({ length: 3 }).map(() =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        name: "박영길",
        desc: "1:1 PT 전문",
        center: "동대문 박영길짐앤피티",
        reviews: 36,
        reviewScore: 5.0,
        oneTimePrice: 20000,
      })),
    ),
  );

  useEffect(() => {
    if (inView) {
      setPages((prev) => [
        ...prev,
        Array.from({ length: 20 }).map((_, i) => ({
          id: i,
          name: "박영길",
          desc: "1:1 PT 전문",
          center: "동대문 박영길짐앤피티",
          reviews: 36,
          reviewScore: 5.0,
          oneTimePrice: 20000,
        })),
      ]);
    }
  }, [inView]);

  return (
    <List className="mt-4 bg-white">
      {pages.map((page, i) =>
        page.map((trainer, j) => (
          <List.Item
            asChild
            className="flex gap-2"
            key={trainer.id}
            ref={i === pages.length - 1 && j < 15 ? ref : undefined}
          >
            <Link href={`/trainer/${trainer.id}`}>
              <Avatar className="w-20 h-20" square>
                <Avatar.Image
                  alt="avatar"
                  src="https://randomuser.me/api/portraits/women/31.jpg"
                />
              </Avatar>
              <div className="flex flex-col flex-auto">
                <p className="font-medium">{`${i} ${j} ${trainer.name}`}</p>

                <p className="text-sm">{trainer.desc}</p>
                <div className="inline-flex items-center text-neutral-500">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm text-neutral-500">{trainer.center}</p>
                </div>

                <div className="flex justify-between items-baseline">
                  <div className="inline-flex items-start gap-1">
                    <Star className="w-3.5 h-3.5" />
                    <span className="text-sm font-medium leading-4">
                      {trainer.reviewScore} ({trainer.reviews})
                    </span>
                  </div>
                  <p className="text-red-500 font-semibold ">
                    1회 {trainer.oneTimePrice}~{" "}
                  </p>
                </div>
              </div>
            </Link>
          </List.Item>
        )),
      )}
    </List>
  );
}
