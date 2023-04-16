import React, {
  useEffect,
  useState,
  isValidElement,
  cloneElement,
  Children,
  useRef
} from "react";
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
  eventIsDraggable?: boolean;
  onEventDragEnd?: (date: Date, event: Object) => void;
  customPrevIcon?: React.ReactNode;
  customNextIcon?: React.ReactNode;
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
  eventIsDraggable = false,
  onEventDragEnd,
  customPrevIcon,
  customNextIcon,
}: Props) {
  
  const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
  const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());

  const draggableElDateRef = useRef<Date | null>(null);
  const dragElIdRef = useRef(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const onDragStart = (id: any) => {
    dragElIdRef.current = id
  };

  const onDragEnter = (e: any, date: any) => {
    e.preventDefault()
    draggableElDateRef.current = date
  }

  const onDragEnd = (e: any) => {
    e.preventDefault()
    const { current } = dragElIdRef
     events?.map((event: any) => {
      if (event.id === current){
        if(draggableElDateRef.current !== null && !isNaN(draggableElDateRef.current.getTime())){
        onEventDragEnd && onEventDragEnd(draggableElDateRef.current, event)
        }
      }
    })
  }

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
          : "w-full h-full border border-opacity-70"
      }
    >
      <div
        className={
          headWrapperClassNames
            ? headWrapperClassNames
            : "w-full  flex justify-between items-center border-b border-opacity-70 p-5 font-bold"
        }
      >
        {customPrevIcon ? (
          isValidElement(customPrevIcon) ? (
            Children?.map(customPrevIcon, (child: React.ReactNode) => {
              return cloneElement(child, {
                onClick: prevMonth,
              });
            })
          ) : (
            <div onClick={prevMonth}>{customPrevIcon}</div>
          )
        ) : (
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
            onClick={prevMonth}
            className="cursor-pointer text-3xl"
          >
            <path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm35.31 292.69a16 16 0 11-22.62 22.62l-96-96a16 16 0 010-22.62l96-96a16 16 0 0122.62 22.62L206.63 256z" />
          </svg>
        )}
        <p>
          {t(CONST_CALENDAR.months[currentMonth])} {currentYear}
        </p>

        {customNextIcon ? (
          isValidElement(customNextIcon) ? (
            Children?.map(customNextIcon, (child: React.ReactNode) => {
              return cloneElement(child, {
                onClick: nextMonth,
              });
            })
          ) : (
            <div onClick={nextMonth}>{customNextIcon}</div>
          )
        ) : (
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
            onClick={nextMonth}
            className="cursor-pointer text-3xl"
          >
            <path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm-40 326.63L193.37 352l96-96-96-96L216 137.37 334.63 256z" />
          </svg>
        )}
      </div>
      <div
        className={
          daysWrapperClassNames
            ? daysWrapperClassNames
            : "w-full grid grid-cols-7 py-5"
        }
      >
        {CONST_CALENDAR.days.map((day: string, index: number) => (
          <p
            key={`${day}-${index}`}
            className={daysClassNames ? daysClassNames : "text-center"}
          >
            {t(day)}
          </p>
        ))}
      </div>
      <div
        className={
          calendarBodyClassNames
            ? calendarBodyClassNames
            : "h-full w-full grid grid-cols-7 text-right border min-h-[600px]"
        }
      >
        {getSortedDays(currentMonth, currentYear).map(
          (day: number, index: number) => (
            <p
              className={`border-r border-b p-3 border-opacity-70 cursor-pointer ${
                areDatesEqual(
                  startingDate,
                  dateObject(day, currentMonth, currentYear)
                )
                  ? "bg-slate-100"
                  : ""
              }`}
              key={`${index}-${day}`}
              onClick={() =>
                day !== undefined &&
                onDateClick &&
                onDateClick({
                  date: dateObject(day, currentMonth, currentYear),
                  day: day,
                  month: currentMonth,
                  year: currentYear,
                })
              }
              onDragEnter={(e) => onDragEnter(e, dateObject(day, currentMonth, currentYear))}
              onDragEnd={onDragEnd}
            >
              <span>{day}</span>
              <span className="flex flex-col gap-1 h-20 overflow-y-auto">
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
                          events && onEventClick && onEventClick(event);
                        }}
                        draggable={eventIsDraggable}
                        onDragStart={() => onDragStart(event.id)}
                        key={event.id}
                      >
                        {event.title}
                      </span>
                    )
                )}
              </span>
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default Calendar;
