import { ReactNode } from "react";
import { SmallHeader } from "@/components/SmallHeader";
export default function KakaoJoinLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen  bg-white">
      <SmallHeader title="소셜 로그인 추가정보" arrrowHidden />

      {children}
    </div>
  );
}
