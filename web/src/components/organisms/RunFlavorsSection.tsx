import { RunFlavorCard } from "../molecules/RunFlavorCard";

type RunFlavorsSectionProps = {
  dates: readonly string[];
};

export function RunFlavorsSection({ dates }: RunFlavorsSectionProps) {
  const weekend = dates.filter((date) => {
    const day = new Date(`${date}T00:00:00`).getDay();
    return day === 0 || day === 6;
  }).length;
  const weekday = dates.length - weekend;
  const monthEnd = dates.filter((date) => Number(date.slice(-2)) >= 25).length;

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <div className="mb-6">
        <p className="font-display text-xs font-black uppercase tracking-[.22em] text-copper">Run flavors</p>
        <h2 className="mt-2 font-display text-4xl font-black uppercase">Rhythm tags</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <RunFlavorCard label="Weekend miles" count={weekend} tone="ember" />
        <RunFlavorCard label="Weekday discipline" count={weekday} tone="dark" />
        <RunFlavorCard label="Month finishers" count={monthEnd} tone="volt" />
      </div>
    </section>
  );
}
