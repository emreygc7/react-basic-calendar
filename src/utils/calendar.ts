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

const getSortedDays = (month: number, year: number ) => {
  const daysInMonth = range(getDaysInMonth(month, year))
  const dayIndex = new Date(year, month, 1).getDay();
  return [
    ...Array(dayIndex === 0 ? 6 : dayIndex - 1),
    ...daysInMonth,
  ]
}

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
