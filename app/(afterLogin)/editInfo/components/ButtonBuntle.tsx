import LightButton from "@/components/LightButton";
import Link from "next/link";
export default function ButtonBundle() {
  return (
    <div className=" mt-2">
      <Link href="../../editInfo/locationModal">
        <LightButton>위치 수정하기</LightButton>
      </Link>
      <LightButton
        type="submit"
        backgroundColor="bg-[#1C743C]"
        className="mt-2.5"
      >
        회원 정보 수정하기
      </LightButton>
    </div>
  );
}
