const LoadingAtom = ({ width }: { width: string }) => {
  return (
    <div
      className={`${width} bg-gray-200 h-8 rounded-lg m-4 animate-pulse`}
    ></div>
  );
};

export default function Looading({ height = 800 }) {
  const atomHeight = 64;
  const atomCount = Math.floor(height / atomHeight);

  const widths = [
    "w-[90%]",
    "w-[80%]",
    "w-[60%]",
    "w-[82%]",
    "w-[40%]",
    "w-[70%]",
    "w-[75%]",
    "w-[80%]",
    "w-[32%]",
    "w-[50%]",
    "w-[60%]",
    "w-[70%]",
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-start mt-2">
      {widths.slice(0, atomCount).map((width, index) => (
        <LoadingAtom key={index} width={width} />
      ))}
    </div>
  );
}
