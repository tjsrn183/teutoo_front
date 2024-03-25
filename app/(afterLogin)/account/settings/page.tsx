import { ArrowLeft } from "lucide-react";
import React from "react";
import SettingsInfo from "./_components/settings-info";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <AppBar sticky>
        <Button size="icon" variant="ghost">
          <ArrowLeft />
        </Button>
        <AppBar.Title>계정 설정</AppBar.Title>
      </AppBar>
      <SettingsInfo />
    </div>
  );
}
