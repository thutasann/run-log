import { Target, TrendingUp } from "lucide-react";
import { WeeklyProgressCard } from "../molecules/WeeklyProgressCard";
import type { MonthlyTotal, WeekTotal } from "../../types";

type RecentRun = {
  date: string;
  label: string;
  offset: number;
};

type MomentumSectionProps = {
  bestMonth: MonthlyTotal;
  recentRunStack: RecentRun[];
  weeklyTotals: WeekTotal[];
};

export function MomentumSection({ bestMonth, recentRunStack, weeklyTotals }: MomentumSectionProps) {
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-10 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
      <article className="relative overflow-hidden border-2 border-asphalt bg-white p-5 shadow-hard">
        <div className="absolute right-5 top-5 hidden h-28 w-28 border-2 border-asphalt bg-volt sm:block" />
        <div className="relative">
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-xs font-black uppercase tracking-[.22em] text-copper">Momentum lab</p>
              <h2 className="mt-2 font-display text-4xl font-black uppercase">Weekly cadence</h2>
            </div>
            <Target className="text-ember" size={34} />
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            {weeklyTotals.map((week) => (
              <WeeklyProgressCard key={week.label} week={week} />
            ))}
          </div>
        </div>
      </article>

      <article className="border-2 border-asphalt bg-asphalt p-5 text-paper shadow-hard">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="font-display text-xs font-black uppercase tracking-[.22em] text-volt">Best block</p>
            <h2 className="mt-2 font-display text-4xl font-black uppercase">{bestMonth.label}</h2>
          </div>
          <TrendingUp className="text-volt" size={34} />
        </div>
        <div className="grid grid-cols-[auto_1fr] items-end gap-4 border-y-2 border-paper/15 py-6">
          <p className="font-display text-7xl font-black leading-none text-ember">{bestMonth.count}</p>
          <p className="pb-2 font-display text-xl font-black uppercase leading-none text-paper/75">
            runs in the strongest recent month
          </p>
        </div>
        <div className="mt-5 grid gap-2">
          {recentRunStack.map((run) => (
            <div
              key={run.date}
              className="flex items-center justify-between border-2 border-paper/15 bg-paper/5 px-3 py-2"
              style={{ marginLeft: `${run.offset * 6}px` }}
            >
              <span className="font-display text-xs font-black uppercase text-paper/75">{run.label}</span>
              <span className="h-2 w-12 bg-volt" />
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
