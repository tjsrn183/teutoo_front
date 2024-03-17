"use client";
import { useProgramInfoQuery } from "@/api/getProgramInfo";
import ImagePreviewCarousel from "@/components/ImagePreviewCarousel";
import Button from "@/components/common/button";
import FixedBottom from "@/components/layout/fixed-bottom";
import React from "react";

interface ProgramInfoProps {
  programId: number;
}

export default function ProgramInfo({
  programId,
}: ProgramInfoProps): JSX.Element {
  const { data } = useProgramInfoQuery({ programId });

  const price = data.price.toLocaleString() + "원";

  return (
    <div>
      <div className="pt-0 pb-24">
        <div className="w-full aspect-video">
          <ImagePreviewCarousel
            images={data.ptProgramImgList.map((imgRes) => imgRes.imgUrl)}
          />
        </div>
        <div className="p-4">
          <div>
            <h2 className="text-xl font-semibold my-2">{data.title}</h2>
            <p className="p-4 bg-neutral-100 rounded-md text-neutral-600">
              {data.content}
            </p>
          </div>

          <p className="font-semibold text-xl text-green-600 my-2 text-right">
            {price}
          </p>
        </div>
      </div>
      <FixedBottom>
        <Button className="w-full">문의하기</Button>
      </FixedBottom>
    </div>
  );
}
