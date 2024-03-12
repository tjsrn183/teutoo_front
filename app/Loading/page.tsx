const LoadingAtom = ({ width }: { width: string }) => {
  return (
    <div
      className={`${width} bg-gray-200 h-8 rounded-lg m-4 animate-pulse`}
    ></div>
  );
};

export default function Loading() {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-start mt-2">
      <LoadingAtom width={"w-[322px]"} />
      <LoadingAtom width={"w-[254px]"} />
      <LoadingAtom width={"w-[152px]"} />
      <LoadingAtom width={"w-[322px]"} />
      <LoadingAtom width={"w-[252px]"} />
      <LoadingAtom width={"w-[122px]"} />
      <LoadingAtom width={"w-[272px]"} />
      <LoadingAtom width={"w-[142px]"} />
      <LoadingAtom width={"w-[202px]"} />
      <LoadingAtom width={"w-[302px]"} />
    </div>
  );
}
