import type { MonthlyTotal } from "../../types";

type MonthBarsProps = {
  maxMonth: number;
  months: MonthlyTotal[];
};

export function MonthBars({ maxMonth, months }: MonthBarsProps) {
  return (
    <div>
      <p className="mb-5 font-display text-xs font-black uppercase tracking-[.22em] text-volt">Last six months</p>
      <div className="grid gap-4">
        {months.map((month) => (
          <div key={month.label} className="grid grid-cols-[3.5rem_1fr_3rem] items-center gap-3">
            <span className="font-display text-sm font-black uppercase text-paper/65">{month.label}</span>
            <div className="h-7 border-2 border-paper/15 bg-paper/5">
              <div
                className="h-full bg-[linear-gradient(90deg,#fc4c02,#d8ff4f)]"
                style={{ width: `${Math.max(4, (month.count / maxMonth) * 100)}%` }}
              />
            </div>
            <span className="text-right font-display text-sm font-black">{month.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
