import Map from "../components/KakaoMap";
export default function Location() {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center bg-gray-200 ">
      <div className="relative  w-4/5 h-2/3 bg-white rounded-3xl drop-shadow-2xl p-5">
        <div className="w-full h-full ">
          <Map />
        </div>
      </div>
    </div>
  );
}
