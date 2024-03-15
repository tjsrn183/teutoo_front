"use client";
import Avatar from "@/components/common/avatar";
import Star from "@/components/common/star";
import TabNavigation from "@/components/common/tab-navigation";

import { MapPin } from "lucide-react";
import ImagePreview from "./image-preview";
import Link from "next/link";
import { useTrainerInfoQuery } from "@/api/getTrainerInfo";

const TAB_ITEMS = [
  {
    label: "소개",
    value: "info",
  },
  {
    label: "자격사항",
    value: "certification",
  },
  {
    label: "프로그램",
    value: "program",
  },
  {
    label: "리뷰",
    value: "review",
  },
];

const CERTIFICATION_IMAGES = [
  "https://placehold.co/200",
  "https://placehold.co/200",
  "https://placehold.co/200",
  "https://placehold.co/200",
];

const PROGRAMS = [
  {
    title: "다이어트",
    description:
      "다이어트 프로그램 설명입니다. 다이어트 프로그램 설명입니다. 다이어트 프로그램 설명입니다. ",
    startPrice: 20000,
    image: "https://placehold.co/80",
  },
  {
    title: "근력강화",
    description:
      "근력강화 프로그램 설명입니다. 근력강화 프로그램 설명입니다. 근력강화 프로그램 설명입니다.",
    startPrice: 20000,
    image: "https://placehold.co/80",
  },
  {
    title: "체형교정",
    description:
      "체형교정 프로그램 설명입니다. 체형교정 프로그램 설명입니다. 체형교정 프로그램 설명입니다.",
    startPrice: 20000,
    image: "https://placehold.co/80",
  },
];

interface TrainerInfoProps {
  id: number;
}

export default function TrainerInfo({ id }: TrainerInfoProps): JSX.Element {
  const { data } = useTrainerInfoQuery({ trainerId: id });

  const minPrice = data.ptProgramResDtoList.reduce(
    (min, program) => (program.price < min ? program.price : min),
    data.ptProgramResDtoList[0].price,
  );
  return (
    <div className="flex flex-col" id="root">
      <Avatar className="w-20 h-20" square>
        <Avatar.Image
          alt="avatar"
          src="https://randomuser.me/api/portraits/women/31.jpg"
        />
      </Avatar>
      <p className="font-medium">{data.trainerName}</p>
      <div className="inline-flex items-center text-neutral-500">
        <MapPin className="w-4 h-4" />
        <p className="text-sm text-neutral-500">{data.gymName}</p>
      </div>
      <div className="inline-flex items-start gap-1">
        <Star className="w-3.5 h-3.5" />
        <span className="text-sm font-medium leading-4">
          {data.reviewScore} ({data.reviewCnt})
        </span>
      </div>
      <p className="text-red-500 font-semibold ">{minPrice}원~</p>
      <p className="bg-neutral-100 p-4 rounded-lg">{data.simpleIntro}</p>
      <TabNavigation className="w-full">
        <TabNavigation.List className=" sticky top-14">
          {TAB_ITEMS.map((item) => (
            <TabNavigation.Trigger key={item.value} value={item.value}>
              {item.label}
            </TabNavigation.Trigger>
          ))}
        </TabNavigation.List>
        <TabNavigation.Content
          value="info"
          className="m-4 py-8 border-b border-neutral-200"
        >
          <h2 className="text-xl font-semibold my-3" id="info">
            트레이너 소개
          </h2>
          <p className="text-neutral-600">{data.introContent}</p>
        </TabNavigation.Content>
        <TabNavigation.Content
          value={TAB_ITEMS[1].value}
          className="m-4 py-8 border-b border-neutral-200"
        >
          <h2 className="text-xl font-semibold my-3" id={TAB_ITEMS[1].value}>
            {TAB_ITEMS[1].label}
          </h2>
          <ul className="grid grid-cols-3 gap-2">
            {data.careerImgList.map((imgInfo, index) => (
              <li key={index}>
                {/* <img src={src} alt="certification" className="rounded-md" /> */}
                <ImagePreview src={imgInfo.imgUrl} />
              </li>
            ))}
          </ul>
        </TabNavigation.Content>
        <TabNavigation.Content
          value={TAB_ITEMS[2].value}
          className="m-4 py-8 border-b border-neutral-200"
        >
          <h2 className="text-xl font-semibold my-3" id={TAB_ITEMS[2].value}>
            {TAB_ITEMS[2].label}
          </h2>
          <ul className="flex flex-col gap-4">
            {data.ptProgramResDtoList.map((program, index) => (
              <Link
                href={`/program/0`}
                key={index}
                className="p-4 border border-neutral-200 rounded-lg shadow-sm flex gap-1"
              >
                <div className="flex-auto">
                  <h3 className="font-semibold">{program.title}</h3>
                  <p className="line-clamp-2 text-neutral-400 text-sm leading-tight">
                    {program.content}
                  </p>
                  <p className="text-red-500 font-semibold">
                    {program.price}원
                  </p>
                </div>
                <img
                  width={80}
                  height={80}
                  src={
                    program?.ptProgramImgList[0]?.imgUrl ||
                    "https://placehold.co/80"
                  }
                  alt={program.title}
                  className="rounded-md"
                />
              </Link>
            ))}
          </ul>
        </TabNavigation.Content>
      </TabNavigation>
    </div>
  );
}
