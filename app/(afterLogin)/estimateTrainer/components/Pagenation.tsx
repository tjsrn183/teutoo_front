"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import next from "@/public/estimate/next.png";
import prev from "@/public/estimate/prev.png";
interface Props {
  totalItems: number; // 데이터의 총 개수
  itemCountPerPage: number; // 페이지 당 보여줄 데이터 개수
  pageCount: number; // 보여줄 페이지 개수
  currentPage: number; // 현재 페이지
}
export default function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
}: Props) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div>
      <ul className=" flex flex-row justify-center text-[#1C743C] font-semibold">
        <li>
          <Link href={`?page=${start - 1}`}>
            <Image src={prev} alt="prev" />
          </Link>
        </li>
        {[...Array(pageCount)].map((a, i) => (
          <ul key={i} className=" mx-3">
            {start + i <= totalPages && (
              <li>
                <Link href={`?page=${start + i}`}>{start + i}</Link>
              </li>
            )}
          </ul>
        ))}
        <li>
          <Link href={`?page=${start + pageCount}`}>
            <Image src={next} alt="next" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
