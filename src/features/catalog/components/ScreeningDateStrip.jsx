import { t, useLanguage } from '../../../shared/i18n/language.js';
import { formatCalendarDate } from "../../../shared/utils/formatCalendarDate.js";
import { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setDateFilter } from "../state/catalogFiltersSlice.js";


export default function ScreeningDateStrip({ availableDates = [], selectedDate: controlledDate, onDateChange }) {
  const language = useLanguage();
  const locale = { AZE: 'az-AZ', EN: 'en-US', RU: 'ru-RU' }[language];
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const catalogDate = useSelector(store => store.catalogFilters.selectedDate);
  const selectedDate = controlledDate ?? catalogDate;
  const sortedDates = [...new Set(availableDates)].sort();
  const start = sortedDates[0] ? new Date(`${sortedDates[0]}T12:00:00`) : new Date();
  const end = new Date('2026-10-04T23:59:59');
  const dates = [];
  for (const date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    dates.push({ value: formatCalendarDate(date), month: date.toLocaleDateString(locale, { month: 'short' }), day: date.getDate() });
  }
  const dateRange = `${dates[0]?.value ?? ''}:${dates.at(-1)?.value ?? ''}`;
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const container = containerRef.current;
    const updateEdges = () => setEdges({
      start: container.scrollLeft <= 1,
      end: container.scrollLeft + container.clientWidth >= container.scrollWidth - 1,
    });
    container.addEventListener("scroll", updateEdges, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(container);
    updateEdges();
    return () => {
      container.removeEventListener("scroll", updateEdges);
      observer.disconnect();
    };
  }, [dateRange]);

  useEffect(() => {
    const container = containerRef.current;
    const selected = container.querySelector('[aria-pressed="true"]');
    if (!selected) return;
    const left = selected.offsetLeft - container.offsetLeft;
    if (left < container.scrollLeft) container.scrollLeft = left;
    else if (left + selected.offsetWidth > container.scrollLeft + container.clientWidth) {
      container.scrollLeft = left + selected.offsetWidth - container.clientWidth;
    }
  }, [selectedDate, dateRange]);

  const scroll = direction => {
    const container = containerRef.current;
    if (!container.firstElementChild) return;
    const step = container.firstElementChild.offsetWidth + parseFloat(getComputedStyle(container).columnGap);
    container.scrollBy({
      left: direction * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };
  const arrowClass = "flex h-11 w-8 shrink-0 items-center justify-center text-[36px] text-white cursor-pointer transition-transform hover:scale-110 disabled:cursor-default disabled:opacity-40 disabled:hover:scale-100 focus-visible:outline-2 focus-visible:outline-white motion-reduce:transition-none";

  return (
    <div role="group" aria-label={t("Seans tarixləri")} className="relative flex w-full max-w-[448px] items-center xl:-ml-8 xl:w-[calc(100%+32px)]">
      <button type="button" aria-label={t("Əvvəlki tarixlər")} disabled={edges.start} onClick={() => scroll(-1)} className={arrowClass}>
        <MdOutlineKeyboardArrowLeft aria-hidden="true" />
      </button>
      <div ref={containerRef} className="cinema-scrollbar-hidden flex min-w-0 flex-1 snap-x snap-mandatory gap-5 overflow-x-auto">
        {dates.map(date => (
          <button
            type="button"
            aria-label={`${date.day} ${date.month}`}
            aria-pressed={selectedDate === date.value}
            key={date.value}
            onClick={() => onDateChange ? onDateChange(date.value) : dispatch(setDateFilter(date.value))}
            className={`flex h-[100px] w-[60px] shrink-0 snap-start flex-col items-center justify-center rounded-full p-[6px] cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white ${selectedDate === date.value ? "bg-[#D9DADB] text-black" : "bg-[#474747] text-[#D9DADB] hover:bg-[#555555]"}`}
          >
            <span className="text-[16px] leading-6 pb-1">{date.month}</span>
            <span className={`mt-1 ${selectedDate === date.value ? 'bg-[#373737]' : 'bg-[#606060]'} rounded-full w-12 h-12 flex items-center justify-center text-white text-[16px]`}>
              {date.day}
            </span>
          </button>
        ))}
      </div>
      <button type="button" aria-label={t("Növbəti tarixlər")} disabled={edges.end} onClick={() => scroll(1)} className={arrowClass}>
        <MdOutlineKeyboardArrowRight aria-hidden="true" />
      </button>
    </div>
  );
}
