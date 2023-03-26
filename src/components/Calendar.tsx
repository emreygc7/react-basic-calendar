import React, { useEffect, useState } from "react";
import "../utils/i18n";
import { useTranslation } from "react-i18next";
import CONST_CALENDAR from "../utils/constant/calendar";
import {
  range,
  getDaysInMonth,
  getSortedDays,
  areDatesEqual,
  dateObject,
} from "../utils/calendar";

interface Props {
  language?: string;
  startingDate?: Date;
  mainWrapperClassNames?: string;
  headWrapperClassNames?: string;
  daysWrapperClassNames?: string;
  daysClassNames?: string;
  calendarBodyClassNames?: string;
  bodyDaysClassNames?: string;
  eventClassNames?: string;
  onDateClick: (date: Object) => void;
  events?: Object[];
  onEventClick?: (event: Object[]) => void;
}

function Calendar({
  language = "en",
  startingDate = new Date(),
  mainWrapperClassNames,
  headWrapperClassNames,
  daysWrapperClassNames,
  daysClassNames,
  calendarBodyClassNames,
  bodyDaysClassNames,
  eventClassNames,
  onDateClick,
  events,
  onEventClick,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
  const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());

  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const prevMonth = () => {
    if (currentMonth > 0) setCurrentMonth((prev) => prev - 1);
    else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth < 11) setCurrentMonth((prev) => prev + 1);
    else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };

  return (
    <div
      className={
        mainWrapperClassNames
          ? mainWrapperClassNames
          : "w-full h-full border border-black border-opacity-70"
      }
    >
      <div
        className={
          headWrapperClassNames
            ? headWrapperClassNames
            : "w-full  flex justify-between items-center border-b border-opacity-70 p-5 font-bold"
        }
      >
        <button onClick={prevMonth}>Prev</button>
        <p>
          {t(CONST_CALENDAR.months[currentMonth])} {currentYear}
        </p>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div
        className={
          daysWrapperClassNames
            ? daysWrapperClassNames
            : "w-full grid grid-cols-7 py-5"
        }
      >
        {getSortedDays(currentMonth, currentYear).map(
          (day: string, index: number) => (
            <p
              key={`${day}-${index}`}
              className={daysClassNames ? daysClassNames : "text-center"}
            >
              {t(day)}
            </p>
          )
        )}
      </div>
      <div
        className={
          calendarBodyClassNames
            ? calendarBodyClassNames
            : "h-full w-full grid grid-cols-7 text-right border"
        }
      >
        {range(getDaysInMonth(currentMonth, currentYear)).map(
          (day: number, index: number) => (
            <p
              className={`border-r border-b p-3 opacity-80 cursor-pointer h-28 ${
                areDatesEqual(
                  startingDate,
                  dateObject(day, currentMonth, currentYear)
                )
                  ? "bg-blue-300"
                  : ""
              }`}
              key={`${index}-${day}`}
              onClick={() =>
                onDateClick({
                  date: dateObject(day, currentMonth, currentYear),
                  day: day,
                  month: currentMonth,
                  year: currentYear,
                })
              }
            >
              <span>{day}</span>
              {events?.map(
                (event: any) =>
                  areDatesEqual(
                    new Date(event.date),
                    dateObject(day, currentMonth, currentYear)
                  ) && (
                    <span
                      className={
                        eventClassNames
                          ? eventClassNames
                          : "text-xs block text-left bg-gray-200 text-gray-800 px-2 py-1 rounded"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        events && onEventClick && onEventClick(event)
                      }}
                      key={event.id}
                    >
                      {event.title}
                    </span>
                  )
              )}
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default Calendar;

