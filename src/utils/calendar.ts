import CONST_CALENDAR from "./constant/calendar";

const range = (end: number) => {
  let result: number[] = [1];
  for (let i = 2; i <= end; i++) {
    result.push(i);
  }
  return result;
};

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getSortedDays = (month: number, year: number) => {
  const dayIndex = new Date(year, month, 1).getDay();
  return [
    ...CONST_CALENDAR.days.slice(dayIndex),
    ...CONST_CALENDAR.days.slice(0, dayIndex),
  ];
};

const dateObject = (day: number, month: number, year: number) => {
  return new Date(year, month, day);
};

const areDatesEqual = (f: Date, s: Date) => {
  return (
    f.getFullYear() === s.getFullYear() &&
    f.getMonth() === s.getMonth() &&
    f.getDate() === s.getDate()
  );
};

export { range, getDaysInMonth, getSortedDays, dateObject, areDatesEqual };
