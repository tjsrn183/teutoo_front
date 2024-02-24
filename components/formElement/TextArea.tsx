interface TextAreaProps {
  title: string;
  placeholder: string;
}
export default function TextArea({ title, placeholder }: TextAreaProps) {
  return (
    <label className="my-2">
      <span className="text-sm">{title}</span>
      <textarea
        placeholder={placeholder}
        className=" text-[#697077] border border-[#DDE1E6] rounded-[12px] w-full h-[150px]"
      ></textarea>
    </label>
  );
}
