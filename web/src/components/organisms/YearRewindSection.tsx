import { YearMonthTile } from "../molecules/YearMonthTile";

type YearMonth = {
  key: string;
  label: string;
  count: number;
  daysInMonth: number;
};

type YearRewindSectionProps = {
  months: YearMonth[];
  total: number;
  year: number;
};

export function YearRewindSection({ months, total, year }: YearRewindSectionProps) {
  const best = months.reduce((winner, month) => (month.count > winner.count ? month : winner), months[0]);

  return (
    <section id="year-rewind" className="scroll-mt-28 border-y-2 border-asphalt bg-asphalt py-10 text-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-xs font-black uppercase tracking-[.22em] text-volt">Year rewind</p>
            <h2 className="mt-2 font-display text-4xl font-black uppercase">{year} wall</h2>
          </div>
          <div className="border-2 border-paper/20 bg-paper/5 px-4 py-3">
            <p className="font-display text-2xl font-black text-volt">{total}</p>
            <p className="text-xs font-black uppercase text-paper/75">Runs this year</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {months.map((month) => (
            <YearMonthTile key={month.key} count={month.count} daysInMonth={month.daysInMonth} label={month.label} />
          ))}
        </div>

        <p className="mt-5 font-display text-sm font-black uppercase text-paper/75">
          Strongest month: <span className="text-volt">{best.label}</span> with {best.count} runs.
        </p>
      </div>
    </section>
  );
}
