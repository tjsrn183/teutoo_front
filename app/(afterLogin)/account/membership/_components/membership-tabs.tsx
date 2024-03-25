"use client";

import Avatar from "@/components/common/avatar";
import List from "@/components/common/list";
import Tabs from "@/components/common/tabs";
import Link from "next/link";

export default function MembershipTabs() {
  return (
    <Tabs defaultValue="upcoming">
      <Tabs.List>
        <Tabs.Trigger value="upcoming">예정된 수업</Tabs.Trigger>
        <Tabs.Trigger value="waiting">예약대기 수업</Tabs.Trigger>
        <Tabs.Trigger value="completed">완료한 수업</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="upcoming">
        <List className="gap-4 p-4">
          {new Array(10).fill(null).map((_, i) => (
            <List.Item asChild key={i}>
              <Link
                href="#"
                className="flex flex-col gap-3 bg-white rounded-lg p-4 border"
              >
                <time className="text-sm">2024.02.15(목) 19:00 ~ 20:00</time>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <Avatar.Image
                      alt="placeholder"
                      src="https://placehold.co/40"
                    />
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">요가</h3>
                    <p className="text-base text-neutral-500">김지수</p>
                  </div>
                </div>
              </Link>
            </List.Item>
          ))}
        </List>
      </Tabs.Content>
      <Tabs.Content value="waiting">예약대기 수업</Tabs.Content>
      <Tabs.Content value="completed">완료한 수업</Tabs.Content>
    </Tabs>
  );
}
