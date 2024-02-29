import DayContourLine from "./DayContourLine";
import ScheduleAtom from "./ScheduleAtom";

export default function DetailedSchedule() {
  const schedule = [
    { day: 12, time: "12:00~13:00", name: "김영자", date: "2022-12-12" },
    { day: 12, time: "13:00~14:00", name: "춘자", date: "2023-12-12" },
    { day: 13, time: "14:00~15:00", name: "김하자", date: "2024-1-13" },
    { day: 14, time: "12:00~13:00", name: "박두철", date: "2024-2-14" },
    { day: 15, time: "12:00~13:00", name: "김풍자", date: "2024-2-15" },
    { day: 29, time: "12:00~13:00", name: "황구반", date: "2024-2-29" },
  ];

  return (
    <div className=" w-screen p-3 flex flex-col">
      {schedule.map((item, index) => (
        <>
          {index > 0 && schedule[index].day !== schedule[index - 1].day && (
            <DayContourLine></DayContourLine>
          )}
          <ScheduleAtom
            key={index}
            day={item.day}
            time={item.time}
            name={item.name}
            hidden={
              index > 0 && schedule[index].day === schedule[index - 1].day
            }
            date={item.date}
          />
        </>
      ))}
    </div>
  );
}
