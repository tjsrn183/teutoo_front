export default function BlankEstimate() {
  return (
    <div className=" w-full relative flex justify-center h-[220px]  top-5">
      <div className=" animate-pulse  mx-5 w-full h-[185px] bg-white top-5 flex flex-col justify-center items-start rounded-xl px-6 drop-shadow-lg">
        <div className=" bg-gray-200 w-[100%]  h-[15%] rounded-xl mt-5"></div>
        <div className="w-[50%] h-[15%] bg-gray-200 rounded-xl my-5"></div>
        <div className="w-[70%] h-[15%] bg-gray-200 rounded-xl mb-5"></div>
      </div>
    </div>
  );
}
