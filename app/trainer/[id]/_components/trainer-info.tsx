"use client";
import Avatar from "@/components/common/avatar";
import Star from "@/components/common/star";
import TabNavigation from "@/components/common/tab-navigation";

import { MapPin } from "lucide-react";
import ImagePreview from "./image-preview";
import Link from "next/link";

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

export default function TrainerInfo(): JSX.Element {
  return (
    <div className="flex flex-col" id="root">
      <Avatar className="w-20 h-20" square>
        <Avatar.Image
          alt="avatar"
          src="https://randomuser.me/api/portraits/women/31.jpg"
        />
      </Avatar>
      <p className="font-medium">박영길</p>
      <div className="inline-flex items-center text-neutral-500">
        <MapPin className="w-4 h-4" />
        <p className="text-sm text-neutral-500">동대문 박영길짐앤피티</p>
      </div>
      <div className="inline-flex items-start gap-1">
        <Star className="w-3.5 h-3.5" />
        <span className="text-sm font-medium leading-4">5.0 (36)</span>
      </div>
      <p className="text-red-500 font-semibold ">1회 20,000원~</p>
      <p className="bg-neutral-100 p-4 rounded-lg">
        트레이너 박영길은 1:1 PT 전문으로 동대문 박영길짐앤피티에서 활동하고
        있습니다.
      </p>
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
          <p className="text-neutral-600">
            매번 마음에 들지않아도 상담후 등록되는pt시스템에 나한테 맞지 못하는
            트레이너에게 피티를 받아 만족을 못하시는 분들 혹은 이벤트 가격으로
            연습생들에게 피티를 받으셧던분들에게는 숨고는 참 좋은
            서비스인거같습니다 트레이너의 성향 및 이력 경력을 확인해 보고상담후
            결정하는 거라 실패확률은 거의 없다고 자부합니다! 식단관리 체형교정
            근막이완 등 바디케어와내 목적과 내몸에 맞는 웨이트를 통해 건강과더
            나아가 혼자서도 운동을 즐기고 잘할수 있게 만드는게 목표입니다 한번
            배우면 평생가는 운동이라구 생각합니다 신중히 생각하고 저에게 오시면
            최선을 다해 수업하겟습니다 ㅎㅎ ❤️400평대 프리미엄 센터현재 97호점
            까지 있는 스포애니(국내최다헬스장) 전지점 이용가능(강남역2호점 기준
            1km기준으로 5개지점 이용가능)
          </p>
        </TabNavigation.Content>
        <TabNavigation.Content
          value={TAB_ITEMS[1].value}
          className="m-4 py-8 border-b border-neutral-200"
        >
          <h2 className="text-xl font-semibold my-3" id={TAB_ITEMS[1].value}>
            {TAB_ITEMS[1].label}
          </h2>
          <ul className="grid grid-cols-3 gap-2">
            {CERTIFICATION_IMAGES.map((src, index) => (
              <li key={index}>
                {/* <img src={src} alt="certification" className="rounded-md" /> */}
                <ImagePreview src={src} />
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
            {PROGRAMS.map((program, index) => (
              <Link
                href={`/program/0`}
                key={index}
                className="p-4 border border-neutral-200 rounded-lg shadow-sm flex gap-1"
              >
                <div className="flex-auto">
                  <h3 className="font-semibold">{program.title}</h3>
                  <p className="line-clamp-2 text-neutral-400 text-sm leading-tight">
                    {program.description}
                  </p>
                  <p className="text-red-500 font-semibold">
                    {program.startPrice}원부터
                  </p>
                </div>
                <img
                  width={80}
                  height={80}
                  src={program.image}
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
