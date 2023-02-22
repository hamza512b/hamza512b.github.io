import clsx from "clsx";
import React, { useId, useMemo, useRef, useState } from "react";
import {
  useFocusTrap,
  useKeyboardAction,
  useOutsideClick,
} from "react-access-hooks";
import styles from "./DatePicker.module.css";
import { DateTime } from "luxon";

function isIsoDate(str: string) {
  return RegExp(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/).test(str);
}
export default function DatePicker() {
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [displayedDate, setDisplayedDate] = useState("");
  const currentDate = useMemo(
    () => new Date(currentYear, currentMonth, currentDay),
    [currentDay, currentMonth, currentYear]
  );
  const id = useId();
  let activeIndex = 0;
  const weeks: { date: DateTime; active: boolean; type: string }[][] =
    useMemo(() => {
      const luxonDate = DateTime.fromJSDate(currentDate || new Date());
      return Array(6)
        .fill(Array(7).fill(0))
        .map((week, i) =>
          week.map((_: number, j: number) => {
            const date = luxonDate
              .startOf("month")
              .startOf("week")
              .plus({ days: 7 * i + j });
            return {
              date,
              active: date.toMillis() === currentDate.getTime(),
              type: luxonDate.month === date.month ? "active" : "inactive",
            };
          })
        );
    }, [currentDate]);
  const datePickerDialogRef = useRef(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);
  const datePickerGridRef = useRef(null);
  useKeyboardAction({
    key: "ArrowUp",
    action: () => {
      setCurrentDay(currentDay - 7);
      requestAnimationFrame(() => {
        selectedItemRef.current?.focus();
      });
    },
    target: datePickerGridRef.current,
  });
  useKeyboardAction({
    key: "ArrowDown",
    action: () => {
      setCurrentDay(currentDay + 7);
      requestAnimationFrame(() => {
        selectedItemRef.current?.focus();
      });
    },
    target: datePickerGridRef.current,
  });
  useKeyboardAction({
    key: "ArrowLeft",
    action: () => {
      setCurrentDay(currentDay - 1);
      requestAnimationFrame(() => {
        selectedItemRef.current?.focus();
      });
    },
    target: datePickerGridRef.current,
  });
  useKeyboardAction({
    key: "ArrowRight",
    action: () => {
      setCurrentDay(currentDay + 1);
      requestAnimationFrame(() => {
        selectedItemRef.current?.focus();
      });
    },
    target: datePickerGridRef.current,
  });
  useKeyboardAction({
    key: "PageUp",
    action: (ev) => {
      if (ev.shiftKey) setCurrentYear(currentYear - 1);
      else setCurrentMonth(currentMonth - 1);
      requestAnimationFrame(() => {
        selectedItemRef.current?.focus();
      });
    },
    target: datePickerGridRef.current,
  });
  useKeyboardAction({
    key: "PageDown",
    action: (ev) => {
      if (ev.shiftKey) setCurrentYear(currentYear + 1);
      else setCurrentMonth(currentMonth + 1);
      requestAnimationFrame(() => {
        selectedItemRef.current?.focus();
      });
    },
    target: datePickerGridRef.current,
  });

  function displayDate(date: Date) {
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    setDisplayedDate(`${ye}/${mo}/${da}`);
  }

  function cancel() {
    const now = isIsoDate(displayedDate) ? new Date(displayedDate) : new Date();
    setCurrentDay(now.getDate());
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  }

  return (
    <div className={styles.datePicker}>
      <label htmlFor={`datepicker-label-${id}`} className="sr-only">
        Choose Date:
      </label>
      <div className={styles.datePickerButton}>
        <input
          type="text"
          id={`datepicker-label-${id}`}
          placeholder="yyyy/mm/dd"
          defaultValue={displayedDate}
          disabled
          aria-autocomplete="none"
        />
        <button
          type="button"
          aria-label={`Date picker button ${
            isIsoDate(displayedDate)
              ? `${new Intl.DateTimeFormat("en", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(displayedDate))}`
              : ""
          }`}
        >
          <svg width="21" height="20" fill="none">
            <path
              d="M6.1 5V1m8 4V1m-9 8h10m-12 10h14a2 2 0 002-2V5a2 2 0 00-2-2h-14a2 2 0 00-2 2v12c0 1.1 1 2 2 2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div
        className={styles.datePickerDialog}
        ref={datePickerDialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`dialog-label-${id}`}
      >
        <div className={styles.datePickerDialogHeader}>
          <button
            onClick={() => setCurrentYear(currentYear - 1)}
            aria-label="Previous Year"
          >
            <svg width="18" height="16" fill="none">
              <path
                d="M8.5 15l-7-7 7-7m8 14l-7-7 7-7"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => setCurrentMonth(currentMonth - 1)}
            aria-label="Previous Month"
          >
            <svg width="9" height="16" fill="none">
              <path
                d="M8 15L1 8l7-7"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span id={`dialog-label-${id}`} aria-live="polite">
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(new Date(currentYear, currentMonth, currentDay))}
          </span>
          <button
            onClick={() => setCurrentMonth(currentMonth + 1)}
            aria-label="Next Month"
          >
            <svg width="9" height="16" fill="none">
              <path
                d="M1 1l7 7-7 7"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => setCurrentYear(currentYear + 1)}
            aria-label="Next Year"
          >
            <svg
              width="18"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 1l7 7-7 7m-8-14l7 7-7 7"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <table
          className={styles.datePickerDialogGrid}
          ref={datePickerGridRef}
          role="grid"
          aria-labelledby={`dialog-label-${id}`}
        >
          <thead>
            <tr>
              <th scope="col" abbr="Monday">
                Mo
              </th>
              <th scope="col" abbr="Tuesday">
                Tu
              </th>
              <th scope="col" abbr="Wednesday">
                We
              </th>
              <th scope="col" abbr="Thursday">
                Th
              </th>
              <th scope="col" abbr="Friday">
                Fr
              </th>
              <th scope="col" abbr="Saturday">
                Sa
              </th>
              <th scope="col" abbr="Sunday">
                Su
              </th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((days, index) => (
              <tr key={index}>
                {days.map(({ date, active, type }, i) => (
                  <td key={date.day} aria-selected={active}>
                    <button
                      className={clsx(active && styles.active)}
                      tabIndex={active ? 0 : -1}
                      ref={active ? selectedItemRef : undefined}
                      onClick={() => {
                        setCurrentDay(date.day);
                        displayDate(
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            date.day
                          )
                        );
                      }}
                      disabled={type === "inactive"}
                    >
                      {date.day}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.datePickerDialogButtons}>
          <button className={styles.secondary} onClick={cancel}>
            Cancel
          </button>
          <button
            className={styles.primary}
            onClick={() => displayDate(currentDate)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
