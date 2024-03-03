export default function FormInputElement({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <>
      <label htmlFor={id} className=" my-3">
        <span className=" font-semibold text-sm">{title}</span>
      </label>
      <input
        type="text"
        id={id}
        className=" border border-gray-400 rounded-lg my-1 py-1"
      />
    </>
  );
}
