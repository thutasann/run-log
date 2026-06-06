import { CalendarDays } from "lucide-react";
import { CalendarMonth } from "../molecules/CalendarMonth";
import { MonthBars } from "../molecules/MonthBars";
import type { ActivityPoint, MonthlyTotal } from "../../types";

type MonthOverviewSectionProps = {
  currentMonthLabel: string;
  maxMonth: number;
  monthGrid: ActivityPoint[];
  monthlyTotals: MonthlyTotal[];
  totalActivities: number;
};

export function MonthOverviewSection({
  currentMonthLabel,
  maxMonth,
  monthGrid,
  monthlyTotals,
  totalActivities
}: MonthOverviewSectionProps) {
  return (
    <section className="border-y-2 border-asphalt bg-asphalt py-10 text-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-10">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <CalendarDays className="text-volt" />
            <h2 className="font-display text-3xl font-black uppercase">{currentMonthLabel} map</h2>
          </div>
          <CalendarMonth days={monthGrid} />
        </div>

        <div className="grid content-between gap-6">
          <MonthBars maxMonth={maxMonth} months={monthlyTotals} />
          <div className="border-2 border-paper/20 bg-paper/5 p-5">
            <p className="font-display text-2xl font-black uppercase text-volt">{totalActivities}</p>
            <p className="mt-2 max-w-lg text-sm font-semibold leading-6 text-paper/65">
              Logged runs and training days, stacked from the first mile to the latest finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
