"use client";
import "react-calendar/dist/Calendar.css";
import "../style/customCalendar.css";
import Calendar from "react-calendar";
import dayjs from "dayjs";
export default function CalendarComponent() {
  const formatShortMonth = ({ date }: { date: Date }) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}.${month}`;
  };
  return (
    <Calendar
      locale="ko"
      formatDay={(locale, date) => dayjs(date).format("DD")}
      navigationLabel={formatShortMonth}
    />
  );
}
