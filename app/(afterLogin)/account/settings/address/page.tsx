import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function AddressPage() {
  return (
    <div className="flex flex-col h-full">
      <AppBar sticky>
        <Button size="icon" variant="ghost">
          <ArrowLeft />
        </Button>
        <AppBar.Title>주소 변경</AppBar.Title>
      </AppBar>
    </div>
  );
}
