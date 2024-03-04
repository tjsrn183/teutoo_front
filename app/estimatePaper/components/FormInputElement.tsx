export default function FormInputElement({
  id,
  title,
  type,
}: {
  id: string;
  title: string;
  type?: string;
}) {
  return (
    <>
      <label htmlFor={id} className=" my-1">
        <span className=" font-semibold text-sm">{title}</span>
      </label>
      <input
        type={type ? type : "text"}
        id={id}
        className=" pl-2 border my-1 py-2 border-[#d9d9d9] rounded-[12px]  focus:outline-none focus:ring-0 focus:border-[#22C55E] hover:border-[#22C55E] transition-colors duration-500 "
      />
    </>
  );
}
