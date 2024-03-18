import { ArrowLeft } from "lucide-react";
import React from "react";
import CardCarousel from "./_components/card-carousel";
import MembershipTabs from "./_components/membership-tabs";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";
import Divider from "@/components/common/divider";

export default function MembershipPage(): JSX.Element {
  return (
    <div className="flex flex-col">
      <AppBar sticky>
        <Button size="icon" variant="ghost">
          <ArrowLeft />
        </Button>
        <AppBar.Title>회원권</AppBar.Title>
      </AppBar>
      <CardCarousel />
      <Divider />
      <MembershipTabs />
    </div>
  );
}
