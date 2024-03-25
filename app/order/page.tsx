import { ArrowLeft } from "lucide-react";
import React from "react";
import OrderClient from "./_components/order-client";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";

export default function OrderPage() {
  return (
    <div className="flex flex-col">
      <AppBar sticky>
        <Button size="icon" variant="ghost">
          <ArrowLeft />
        </Button>
        <AppBar.Title>주문하기</AppBar.Title>
      </AppBar>
      <OrderClient />
    </div>
  );
}
