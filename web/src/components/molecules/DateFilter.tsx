import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { IconButton } from "../atoms/IconButton";

type DateFilterProps = {
  activeDayCount: number;
  activityCount: number;
  calendarDays: Array<string | null>;
  filterLabel: string;
  hasActivity: (date: string) => boolean;
  hasRun: (date: string) => boolean;
  monthLabel: string;
  selectedDate: string | null;
  onClear: () => void;
  onNextMonth: () => void;
  onPreviousMonth: () => void;
  onSelectDate: (date: string) => void;
};

export function DateFilter({
  activeDayCount,
  activityCount,
  calendarDays,
  filterLabel,
  hasActivity,
  hasRun,
  monthLabel,
  selectedDate,
  onClear,
  onNextMonth,
  onPreviousMonth,
  onSelectDate
}: DateFilterProps) {
  return (
    <div className="border-2 border-asphalt bg-white p-4 shadow-hard">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-xs font-black uppercase tracking-[.22em] text-copper">Date filter</p>
          <h3 className="mt-1 font-display text-2xl font-black uppercase">{filterLabel}</h3>
        </div>
        <IconButton label="Clear date filter" onClick={onClear} variant="light">
          <X size={18} />
        </IconButton>
      </div>

      <div className="mb-4 flex items-center justify-between border-y-2 border-asphalt py-3">
        <IconButton label="Previous month" onClick={onPreviousMonth}>
          <ChevronLeft size={18} />
        </IconButton>
        <p className="font-display text-sm font-black uppercase">{monthLabel}</p>
        <IconButton label="Next month" onClick={onNextMonth}>
          <ChevronRight size={18} />
        </IconButton>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <span key={`filter-${day}-${index}`} className="pb-1 text-center font-display text-xs font-black text-asphalt/45">
            {day}
          </span>
        ))}
        {calendarDays.map((date, index) => {
          const isSelected = date === selectedDate;

          return (
            <button
              key={`${date ?? "blank"}-${index}`}
              type="button"
              disabled={!date}
              className={`grid aspect-square place-items-center border-2 font-display text-xs font-black transition ${
                !date
                  ? "border-transparent"
                  : isSelected
                    ? "border-asphalt bg-ember text-paper shadow-[4px_4px_0_#171614]"
                    : hasActivity(date)
                      ? "border-asphalt bg-volt text-asphalt hover:-translate-y-0.5"
                      : hasRun(date)
                        ? "border-asphalt/40 bg-paper text-asphalt/65 hover:bg-fog"
                        : "border-asphalt/15 bg-fog text-asphalt/35"
              }`}
              onClick={() => date && onSelectDate(date)}
            >
              {date ? Number(date.slice(-2)) : ""}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="border-2 border-asphalt bg-paper p-3">
          <p className="font-display text-2xl font-black">{activityCount}</p>
          <p className="text-xs font-black uppercase text-asphalt/55">Activities</p>
        </div>
        <div className="border-2 border-asphalt bg-asphalt p-3 text-paper">
          <p className="font-display text-2xl font-black text-volt">{activeDayCount}</p>
          <p className="text-xs font-black uppercase text-paper/55">Active days</p>
        </div>
      </div>
    </div>
  );
}
