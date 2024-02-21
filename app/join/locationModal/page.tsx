export default function Location() {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-gray-700 opacity-50"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-2/3 h-1/2 text-center bg-white rounded-[6px] shadow-2xl text-black">
          원래경로
        </div>
      </div>
    </>
  );
}
