import { ArrowLeft } from "lucide-react";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";
import Divider from "@/components/common/divider";
import ScheduleTabs from "@/app/(afterLogin)/account/schedule/_components/schedule-tabs";
import BackButton from "@/components/BackButton";

export default function MembershipPage(): JSX.Element {
  return (
    <div className="flex flex-col">
      <AppBar sticky>
        <BackButton />
        <AppBar.Title>일정</AppBar.Title>
      </AppBar>
      <ScheduleTabs />
    </div>
  );
}
