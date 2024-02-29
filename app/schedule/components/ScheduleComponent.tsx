import DetailedSchedule from "./DetailedSchedule";

export default function ScheduleComponent() {
  const date = new Date();
  const koreanMonth = date.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "numeric",
  });

  return (
    <div className="text-black w-screen">
      <div className="w-screen border-b-4 border-gray-200 font-semibold flex justify-center text-xl">
        <time dateTime={koreanMonth}>{koreanMonth}</time>
      </div>
      <DetailedSchedule />
    </div>
  );
}
