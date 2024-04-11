interface EditTextFieldProps {
  title: string;
  placeholder: string;
  disabled?: boolean;
  state: string;
  setState: (value: string) => void;
}
export default function EditTextField({
  setState,
  state,
  title,
  placeholder,
  disabled,
}: EditTextFieldProps) {
  return (
    <label className="text-[#323232] flex flex-col font-bold my-1">
      <span className=" pl-1">{title}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="bg-[#e4e6e7] rounded-[6px] py-2 border font-normal focus:outline-none focus:ring-0 focus:border-[#22C55E] hover:border-[#22C55E] transition-colors duration-500 pl-2"
        value={state}
        disabled={disabled}
        onChange={(e) => setState(e.target.value)}
      />
    </label>
  );
}
