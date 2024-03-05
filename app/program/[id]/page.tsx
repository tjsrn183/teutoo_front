import { ArrowLeft } from "lucide-react";
import ProgramInfo from "./_components/program-info";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";

export default function ProgramDetailPage(): JSX.Element {
  return (
    <div className="flex flex-col">
      <AppBar sticky>
        <Button size="icon" variant="ghost">
          <ArrowLeft />
        </Button>
        <AppBar.Title>프로그램 상세</AppBar.Title>
      </AppBar>
      <ProgramInfo />
    </div>
  );
}
