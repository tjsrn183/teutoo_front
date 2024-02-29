import { SmallHeader } from "@/components/SmallHeader";
import { ReactNode } from "react";

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SmallHeader title="PT 일정" />
      {children}
    </div>
  );
}
