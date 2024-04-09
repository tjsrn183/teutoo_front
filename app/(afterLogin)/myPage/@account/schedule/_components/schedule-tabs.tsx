"use client";

import Avatar from "@/components/common/avatar";
import List from "@/components/common/list";
import Tabs from "@/components/common/tabs";
import Link from "next/link";
import { useUserScheduleQuery } from "@/api/getUserSchedule";
import { MemberSchedule } from "@/types/api.type";
import { formatSchedule } from "@/lib/utils";

export default function ScheduleTabs() {
  const { data } = useUserScheduleQuery();

  return (
    <Tabs defaultValue="PENDING">
      <Tabs.List>
        <Tabs.Trigger value="RESERVED">예약된 수업</Tabs.Trigger>
        <Tabs.Trigger value="PENDING">예약대기 수업</Tabs.Trigger>
        <Tabs.Trigger value="CANCELED">취소된 수업</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="RESERVED">
        <ScheduleList
          schedules={data?.filter((schedule) => schedule.status === "RESERVED")}
        />
      </Tabs.Content>
      <Tabs.Content value="PENDING">
        <ScheduleList
          schedules={data?.filter((schedule) => schedule.status === "PENDING")}
        />
      </Tabs.Content>

      <Tabs.Content value="CANCELED">
        <ScheduleList
          schedules={data?.filter((schedule) => schedule.status === "CANCELED")}
        />
      </Tabs.Content>
    </Tabs>
  );
}

const ScheduleList = ({ schedules }: { schedules: MemberSchedule[] }) => {
  return (
    <List className="gap-4 p-4">
      {schedules.map((schedule, i) => (
        <List.Item asChild key={i}>
          <Link
            href="#"
            className="flex flex-col gap-3 bg-white rounded-lg p-4 border"
          >
            <time className="text-sm">
              {formatSchedule(schedule.startDateTime, schedule.endDateTime)}
            </time>
            <div className="flex items-center gap-2">
              <Avatar>
                <Avatar.Image
                  alt="placeholder"
                  src={schedule.imgResDto?.imgUrl || "https://placehold.co/40"}
                />
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  {schedule.programName}
                </h3>
                <p className="text-base text-neutral-500">
                  {schedule.trainerName}
                </p>
              </div>
            </div>
          </Link>
        </List.Item>
      ))}
    </List>
  );
};
