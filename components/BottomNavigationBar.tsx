"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/tailwind.utils";
import {
  Home,
  ClipboardList,
  MessageSquareMore,
  UserRound,
} from "lucide-react";
const NAVIGATION_ITEMS = [
  {
    id: "home",
    path: "/",
    name: "홈",
    icon: Home,
  },
  {
    id: "calc",
    path: "/estimate",
    name: "견적",
    icon: ClipboardList,
  },
  {
    id: "chat",
    path: "/chat",
    name: "채팅",
    icon: MessageSquareMore,
  },
  {
    id: "account",
    path: "/myPage",
    name: "나",
    icon: UserRound,
  },
];

export default function BottomNavigationBar() {
  const path = usePathname();
  return (
    <div className=" fixed bottom-0 bg-white h-14 flex z-30 md:left-1/2 md:transform md:-translate-x-1/2 w-full">
      {NAVIGATION_ITEMS.map((item) => (
        <Link
          href={item.path}
          key={item.id}
          className={cn(
            "w-full flex flex-col justify-center items-center hover:bg-neutral-100",
            path === item.path ? "text-green-600" : " text-neutral-500",
          )}
        >
          <item.icon />
          <span className="text-sm">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}
