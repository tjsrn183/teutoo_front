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
        className=" border border-gray-400 rounded-lg my-1 py-2"
      />
    </>
  );
}
