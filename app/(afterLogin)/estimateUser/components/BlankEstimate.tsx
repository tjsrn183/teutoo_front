export default function BlankEstimate() {
  return (
    <div className=" w-screen h-[220px]">
      <div className=" bg-white absolute right-8 left-8 h-[185px] top-5 flex flex-col justify-center items-start rounded-xl px-6 drop-shadow-lg">
        <div className=" bg-gray-200 w-[100%] h-[50%] rounded-xl mt-5"></div>
        <div className="w-[80%] h-[20%] bg-gray-200 rounded-xl my-5"></div>
        <div className="w-[50%] h-[20%] bg-gray-200 rounded-xl mb-5"></div>
      </div>
    </div>
  );
}
