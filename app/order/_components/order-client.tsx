"use client";
import Button from "@/components/common/button";
import FixedBottom from "@/components/layout/fixed-bottom";
import { cn } from "@/lib/utils/tailwind.utils";
import React from "react";

const PROGRAM_DATA = {
  name: "프로그램 이름",
  description: "프로그램 설명",
  imageUrl: "https://placehold.co/600x400",
  option: {
    name: "옵션 이름",
    description: "옵션 설명",
    price: 20000,
  },
};

export default function OrderClient(): JSX.Element {
  const [selectedPayment, setSelectedPayment] = React.useState("카드");

  const handlePayment = (payment: string) => {
    setSelectedPayment(payment);
  };

  return (
    <div>
      <section className="flex flex-col gap-4 px-4 py-8">
        <h2 className="text-xl font-semibold">주문상품</h2>
        <div className="flex flex-col gap-1">
          <div className="flex">
            <span className="text-neutral-400 w-24">프로그램 명</span>
            <p>{PROGRAM_DATA.name}</p>
          </div>
          <div className="flex">
            <span className="text-neutral-400  w-24">옵션</span>
            <p>{PROGRAM_DATA.option.name}</p>
          </div>
          <div className="flex">
            <span className="text-neutral-400  w-24">가격</span>
            <p>{PROGRAM_DATA.option.price}</p>
          </div>
        </div>
      </section>
      <div className="bg-neutral-200 h-1 w-full" />
      <section className="flex flex-col gap-4 px-4 py-8">
        <h2 className="text-xl font-semibold">결제수단</h2>
        <div className="grid grid-cols-3 gap-x-3">
          {["카드", "가상계좌", "휴대폰"].map((payment) => (
            <button
              key={payment}
              className={cn(
                "flex justify-center items-center gap-2 border border-neutral-400 text-neutral-600 py-3.5 rounded",
                payment === selectedPayment &&
                  "border-green-600 text-green-600 font-semibold",
              )}
              onClick={() => handlePayment(payment)}
            >
              <span>{payment}</span>
            </button>
          ))}
        </div>
      </section>
      <div className="bg-neutral-200 h-1 w-full" />
      <section className="flex flex-col gap-4 px-4 py-8">
        <h2 className="text-xl font-semibold">결제금액</h2>
        <div className="flex items-center">
          <span className="text-neutral-400  w-24">총 결제 가격</span>
          <div className="flex-auto text-right text-xl">
            <span className="font-semibold">{PROGRAM_DATA.option.price}</span>원
          </div>
        </div>
      </section>
      <FixedBottom>
        <Button className="w-full">결제하기</Button>
      </FixedBottom>
    </div>
  );
}
