"use client";
import Avatar from "@/components/common/avatar";
import Star from "@/components/common/star";
import TabNavigation from "@/components/common/tab-navigation";

import { MapPin } from "lucide-react";
import ImagePreview from "../../../../components/ImagePreview";
import Link from "next/link";
import { useTrainerInfoQuery } from "@/api/getTrainerInfo";
import Image from "next/image";
import { formatWon } from "@/lib/utils";

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

  const minPrice =
    data.ptProgramResDtoList.length > 0
      ? data.ptProgramResDtoList.reduce(
          (min, program) => (program.price < min ? program.price : min),
          data.ptProgramResDtoList[0].price,
        )
      : null;
  return (
    <div className="flex flex-col" id="root">
      <div className="p-4">
        <Avatar className="w-24 h-24" square>
          <Avatar.Image
            alt="avatar"
            src={data.imgResDto?.imgUrl || "/blank-profile.webp"}
          />
        </Avatar>
        <h1 className="font-medium mt-1 text-xl">{data.trainerName}</h1>
        <div className="inline-flex items-center text-neutral-500 ">
          <MapPin className="w-5 h-5" />
          <p className="text-neutral-500 text-lg">
            {data.gymName} · {data.trainerAddress}
          </p>
        </div>
        <div className="flex items-start gap-1">
          <Star className="w-4 h-4" />
          <span className="text-sm font-medium">
            {data.reviewScore} ({data.reviewCnt})
          </span>
        </div>
        <p className="text-red-500 font-semibold mt-1">
          {minPrice ? minPrice + "원~" : "프로그램 없음"}
        </p>
        <p className="bg-neutral-100 p-4 rounded-lg mt-4">{data.simpleIntro}</p>
      </div>
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
          className="m-4 py-8 border-b border-neutral-200 min-h-64"
        >
          <h2 className="text-xl font-semibold my-3" id="info">
            트레이너 소개
          </h2>
          <p className="text-neutral-600">{data.introContent}</p>
        </TabNavigation.Content>
        <TabNavigation.Content
          value={TAB_ITEMS[1].value}
          className="m-4 py-8 border-b border-neutral-200 min-h-64"
        >
          <h2 className="text-xl font-semibold my-3" id={TAB_ITEMS[1].value}>
            {TAB_ITEMS[1].label}
          </h2>
          <ul className="grid grid-cols-3 gap-2">
            {data.careerImgList.map((imgInfo, index) => (
              <li key={index}>
                {/* <img src={src} alt="certification" className="rounded-md" /> */}
                <ImagePreview
                  src={imgInfo.imgUrl}
                  alt="certification"
                  width={200}
                  height={200}
                />
              </li>
            ))}
          </ul>
        </TabNavigation.Content>
        <TabNavigation.Content
          value={TAB_ITEMS[2].value}
          className="m-4 py-8 border-b border-neutral-200 min-h-64"
        >
          <h2 className="text-xl font-semibold my-3" id={TAB_ITEMS[2].value}>
            {TAB_ITEMS[2].label}
          </h2>
          <ul className="flex flex-col gap-4">
            {data.ptProgramResDtoList.map((program, index) => (
              <Link
                href={`/program/${program.ptProgramId}`}
                key={index}
                className="p-4 border border-neutral-200 rounded-lg shadow-sm flex gap-1"
              >
                <div className="flex-auto">
                  <h3 className="font-semibold">{program.title}</h3>
                  <p className="line-clamp-2 text-neutral-400 text-sm leading-tight">
                    {program.content}
                  </p>
                  <p className="text-red-500 font-semibold">
                    {formatWon(program.price)}
                  </p>
                </div>
                <Image
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
        <TabNavigation.Content
          value={TAB_ITEMS[3].value}
          className="m-4 py-8 border-b border-neutral-200 min-h-64"
        >
          <h2 className="text-xl font-semibold my-3" id={TAB_ITEMS[2].value}>
            {TAB_ITEMS[3].label}
          </h2>
        </TabNavigation.Content>
      </TabNavigation>
    </div>
  );
}
