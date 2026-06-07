import type { ActivityPoint } from "../../types";

type CalendarMonthProps = {
  days: ActivityPoint[];
};

export function CalendarMonth({ days }: CalendarMonthProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
        <span key={`${day}-${index}`} className="pb-1 text-center font-display text-xs font-black text-paper/75">
          {day}
        </span>
      ))}
      {days.map((day, index) => (
        <div
          key={`${day.date}-${index}`}
          className={`grid aspect-square place-items-center border-2 text-sm font-black ${
            !day.date
              ? "border-transparent"
              : day.isToday
                ? "border-volt bg-ember text-paper"
                : day.ran
                  ? "border-volt bg-volt text-asphalt"
                  : "border-paper/25 bg-paper/5 text-paper/75"
          }`}
        >
          {day.day || ""}
        </div>
      ))}
    </div>
  );
}
