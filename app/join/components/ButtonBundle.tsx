import LightButton from "@/components/LightButton";
import Link from "next/link";
export default function ButtonBundle() {
  return (
    <div className=" fixed bottom-2 left-2 right-2">
      <Link href="../../join/locationModal">
        <LightButton>주소찾기</LightButton>
      </Link>
      <LightButton
        type="submit"
        backgroundColor="bg-[#1C743C]"
        className="mt-2.5"
      >
        회원가입
      </LightButton>
    </div>
  );
}
