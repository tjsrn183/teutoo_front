import { ArrowLeft } from "lucide-react";
import React from "react";
import PaymentHistoryTabs from "./_components/payment-history-tabs";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";

export default function PaymentPage() {
  return (
    <div className="flex flex-col">
      <AppBar sticky>
        <Button size="icon" variant="ghost">
          <ArrowLeft />
        </Button>
        <AppBar.Title>결제내역</AppBar.Title>
      </AppBar>
      <PaymentHistoryTabs />
    </div>
  );
}
