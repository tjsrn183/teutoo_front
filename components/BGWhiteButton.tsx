interface BGWhiteProps {
  onClick?: () => void;
  text: string;
}
export const BGWhiteButton = ({ onClick, text }: BGWhiteProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-[37px] border border-[#DDE1E6] rounded-[12px] text-[#175601] font-semibold my-3"
    >
      {text}
    </button>
  );
};
