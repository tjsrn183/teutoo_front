import ScheduleAtom from "./ScheduleAtom";

export default function DayScheduleList() {
  const schedule = [
    { day: 12, time: "12:00~13:00", name: "김영자", date: "2022-12-12" },
    { day: 12, time: "13:00~14:00", name: "김춘자", date: "2023-12-12" },
    { day: 13, time: "14:00~15:00", name: "김하자", date: "2024-1-13" },
    { day: 14, time: "12:00~13:00", name: "박두철", date: "2024-2-14" },
    { day: 14, time: "12:00~13:00", name: "박두철", date: "2024-2-14" },
    { day: 14, time: "12:00~13:00", name: "박두철", date: "2024-2-14" },
    { day: 14, time: "12:00~13:00", name: "박두철", date: "2024-2-14" },
  ];

  return (
    <div className=" w-full bg-white mt-6 rounded-2xl p-4 flex flex-col items-center mb-4">
      <span className=" flex justify-start w-full text-[#36393E] font-bold ml-6">
        2024.03.07 목
      </span>
      {schedule.map((item, index) => (
        <ScheduleAtom
          key={index}
          day={item.day}
          time={item.time}
          name={item.name}
          date={item.date}
        />
      ))}
    </div>
  );
}
