import { ArrowLeft } from "lucide-react";
import React from "react";
import UsernameForm from "./_components/username-form";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";

export default function UsernamePage() {
  return (
    <div className="flex flex-col h-full">
      <AppBar sticky>
        <Button size="icon" variant="ghost">
          <ArrowLeft />
        </Button>
        <AppBar.Title>이름 변경</AppBar.Title>
      </AppBar>
      <UsernameForm />
    </div>
  );
}
