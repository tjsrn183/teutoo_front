"use client";
import Button from "@/components/common/button";
import DropdownMenu from "@/components/common/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function AddressMenu(): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost">
          서울 강서구 화곡동 <ChevronDown strokeWidth={1} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-full min-w-52">
        <DropdownMenu.Item>서울 강서구 화곡동</DropdownMenu.Item>
        <DropdownMenu.Item>서울 강서구 화곡동</DropdownMenu.Item>
        <DropdownMenu.Item>서울 강서구 화곡동</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
