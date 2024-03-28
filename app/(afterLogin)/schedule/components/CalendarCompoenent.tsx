"use client";
import "react-calendar/dist/Calendar.css";
import "../style/customCalendar.css";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { useDateStore } from "@/store/useDateStore";
export default function CalendarComponent() {
  const { date, setDate } = useDateStore();

  return (
    <Calendar
      locale="ko"
      formatDay={(locale, date) => dayjs(date).format("DD")}
      onChange={(value) => setDate(value)}
    />
  );
}
