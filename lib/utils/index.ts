import { LocalTime } from "@/types/api.type";

/**
 * Generate a list of times between the start and end times.
 * @param startTime The start time in the format "HH:mm".
 * @param endTime The end time in the format "HH:mm".
 * @returns A list of times between the start and end times.
 * @example
 * generateTimeList("09:00", "12:00");
 * // => ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"]
 */
export function generateTimeList(startTime: string, endTime: string): string[] {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const timeList: string[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === startHour && minute < startMinute) {
        continue;
      }
      if (hour === endHour && minute >= endMinute) {
        break;
      }
      timeList.push(`${hour}:${minute.toString().padStart(2, "0")}`);
    }
  }
  return timeList;
}

export function returnISOString(date: Date, time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  const newDate = new Date(date);
  newDate.setHours(hour, minute);
  return newDate.toISOString();
}

export function getEndTime(startTime: string, duration: number): string {
  const [hour, minute] = startTime.split(":").map(Number);
  const newDate = new Date();
  newDate.setHours(hour, minute + duration);
  return `${newDate.getHours()}:${newDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export function dateToLocalString(UTCdate: string) {
  const date = new Date(UTCdate);
  return date.toLocaleString();
}

export function formatSchedule(startDateTime: string, endDateTime: string) {
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime);

  const year = startDate.getFullYear();
  const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
  const day = startDate.getDate().toString().padStart(2, "0");
  const startHours = startDate.getHours().toString().padStart(2, "0");
  const startMinutes = startDate.getMinutes().toString().padStart(2, "0");
  const endHours = endDate.getHours().toString().padStart(2, "0");
  const endMinutes = endDate.getMinutes().toString().padStart(2, "0");

  return `${year}.${month}.${day} ${startHours}:${startMinutes} ~${endHours}:${endMinutes}`;
}

export function formatWon(price: number) {
  return price.toLocaleString() + "원";
}
