"use client";
import Button from "@/components/common/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <Button size="icon" variant="ghost" onClick={goBack}>
      <ArrowLeft />
    </Button>
  );
}
