"use client";

import Avatar from "@/components/common/avatar";
import List from "@/components/common/list";
import Tabs from "@/components/common/tabs";
import Link from "next/link";

export default function PaymentHistoryTabs(): JSX.Element {
  return (
    <Tabs defaultValue="all">
      <Tabs.List>
        <Tabs.Trigger value="all">전체</Tabs.Trigger>
        <Tabs.Trigger value="paid">결제완료</Tabs.Trigger>
        <Tabs.Trigger value="purchased">구매확정</Tabs.Trigger>
        <Tabs.Trigger value="canceled">결제취소</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="all">
        <List className="gap-4 p-4">
          {new Array(10).fill(null).map((_, i) => (
            <List.Item asChild key={i}>
              <Link
                href="#"
                className="flex flex-col gap-3 bg-white rounded-lg p-4 border border-neutral-200 hover:shadow hover:border-neutral-900"
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
      <Tabs.Content value="paid">결제완료</Tabs.Content>
      <Tabs.Content value="purchased">구매확정</Tabs.Content>
      <Tabs.Content value="canceled">결제취소</Tabs.Content>
    </Tabs>
  );
}
