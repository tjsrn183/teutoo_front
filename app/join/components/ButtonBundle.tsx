import Button from "@/components/Button";
import Link from "next/link";
export default function ButtonBundle() {
  return (
    <div className=" fixed bottom-2 left-2 right-2">
      <Link href="../../join/locationModal">
        <Button>주소찾기</Button>
      </Link>
      <Button type="submit" backgroundColor="bg-[#1C743C]" className="mt-2.5">
        회원가입
      </Button>
    </div>
  );
}
