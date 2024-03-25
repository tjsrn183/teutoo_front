import { SmallHeader } from "@/components/SmallHeader";
import { ReactNode } from "react";

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen  bg-gray-200 ">
      <SmallHeader title="PT 일정" />
      {children}
    </div>
  );
}
