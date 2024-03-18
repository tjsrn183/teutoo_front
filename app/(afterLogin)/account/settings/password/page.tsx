import { ArrowLeft } from "lucide-react";
import React from "react";
import PasswordForm from "./_components/password-form";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";

export default function PasswordPage() {
  return (
    <div className="flex flex-col h-full">
      <AppBar sticky>
        <Button size="icon" variant="ghost">
          <ArrowLeft />
        </Button>
        <AppBar.Title>비밀번호 변경</AppBar.Title>
      </AppBar>
      <PasswordForm />
    </div>
  );
}
