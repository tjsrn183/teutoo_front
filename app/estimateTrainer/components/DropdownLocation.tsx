"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ButtonLocation from "./ButtonLocation";
import DropdownItems from "./DropdownItems";
export default function DropdownLocation() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <ButtonLocation />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="drop-shadow-2xl mt-2  rounded-lg bg-white z-50">
        <DropdownMenu.Item>
          <DropdownItems item="서울특별시" />
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <DropdownItems item="부산광역시" />
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <DropdownItems item="대구광역시" />
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <DropdownItems item="인천광역시" />
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <DropdownItems item="광주광역시" />
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <DropdownItems item="울산광역시" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
