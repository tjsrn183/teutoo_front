import DayScheduleList from "./DayScheduleList";
import CalendarComponent from "./CalendarCompoenent";
export default function ScheduleComponent() {
  return (
    <div className=" w-full flex justify-center items-center mt-2 h-full">
      <div className=" w-[80%] flex flex-col h-full">
        <CalendarComponent />
        <DayScheduleList />
      </div>
    </div>
  );
}
