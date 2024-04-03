import Image, { StaticImageData } from "next/image";
import Link from "next/link";
export default function MyPageButton({
  src,
  alt,
  content,
  move,
}: {
  src: string | StaticImageData;
  alt: string;
  content: string;
  move: string;
}) {
  return (
    <Link
      href={move}
      className=" flex-1 m-1 text-[14px] flex flex-col items-center font-semibold bg-gray-200 py-2 rounded-lg "
    >
      <Image src={src} alt={alt} />
      {content}
    </Link>
  );
}
