import Button from "@/components/Button";
import Link from "next/link";
export default function ButtonBundle() {
  return (
    <>
      <Link href="../../join/locationModal">
        <Button>주소찾기</Button>
      </Link>
      <Button type="submit" backgroundColor="bg-[#1C743C]" className="mt-2.5">
        회원가입
      </Button>
    </>
  );
}
