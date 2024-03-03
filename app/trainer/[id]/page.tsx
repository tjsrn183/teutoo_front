import { ArrowLeft, MoreVertical } from "lucide-react";
import TrainerInfo from "./_components/trainer-info";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";
import FixedBottom from "@/components/layout/fixed-bottom";

export default function TrainerDetailPage(): JSX.Element {
  return (
    <div className="flex flex-col">
      <AppBar sticky>
        <Button size="icon" variant="ghost">
          <ArrowLeft />
        </Button>
        <AppBar.Title>트레이너 상세</AppBar.Title>
        <Button size="icon" variant="ghost">
          <MoreVertical />
        </Button>
      </AppBar>
      <TrainerInfo />
      <FixedBottom>
        <Button className="w-full">문의하기</Button>
      </FixedBottom>
    </div>
  );
}
