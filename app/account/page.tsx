import AppBar from "@/components/common/app-bar";
import React from "react";
import AccountInfo from "./_components/account-info";
import AccountTopMenu from "./_components/account-top-menu";

export default function AccountPage(): JSX.Element {
  return (
    <div className="w-full h-full flex flex-col">
      <AppBar sticky>
        <AppBar.Title>마이페이지</AppBar.Title>
      </AppBar>
      <AccountInfo />
      <AccountTopMenu />
    </div>
  );
}
