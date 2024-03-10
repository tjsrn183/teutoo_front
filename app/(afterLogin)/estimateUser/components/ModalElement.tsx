interface ModalElementProps {
  title: string;
  value: string | number;
}
export default function ModalElement({ title, value }: ModalElementProps) {
  return (
    <div className=" flex flex-col my-5">
      <span className=" text-gray-400">{title}</span>
      <span className=" text-xl">{value}</span>
    </div>
  );
}
