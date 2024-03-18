import { CalendarCheck, CreditCard, Ticket } from "lucide-react";
import Link from "next/link";
import React from "react";

const MENU_ITEMS: {
  label: string;
  href: string;
  icon: JSX.Element;
}[] = [
  {
    label: "PT 일정",
    href: "/account/schedule",
    icon: <CalendarCheck />,
  },
  {
    label: "회원권",
    href: "/account/membership",
    icon: <Ticket />,
  },
];

export default function AccountTopMenu(): JSX.Element {
  return (
    <div className="flex gap-2 mt-8 p-4">
      {MENU_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="w-full flex flex-col items-center bg-neutral-100 rounded-md py-2"
        >
          {item.icon}
          <span className="text-sm">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
