export default function DropdownItems({ item }: { item: string }) {
  return (
    <div className=" text-gray-600  w-[170px] flex justify-center text-base font-bold ">
      {item}
    </div>
  );
}
