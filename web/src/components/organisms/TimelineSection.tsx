import { ArrowUpRight } from "lucide-react";
import { formatPrettyDate } from "../../lib/stats";
import type { StravaActivity } from "../../data/run-data";

type ActivityGroup = {
  key: string;
  label: string;
  items: readonly StravaActivity[];
};

type TimelineSectionProps = {
  groups: ActivityGroup[];
};

export function TimelineSection({ groups }: TimelineSectionProps) {
  return (
    <section id="timeline" className="scroll-mt-28 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <div className="mb-6">
        <p className="font-display text-xs font-black uppercase tracking-[.22em] text-copper">Run timeline</p>
        <h2 className="mt-2 font-display text-4xl font-black uppercase">Month by month</h2>
      </div>
      <div className="grid gap-5">
        {groups.map((group) => (
          <article key={group.key} className="grid gap-4 border-2 border-asphalt bg-white p-5 shadow-hard lg:grid-cols-[16rem_1fr]">
            <div>
              <p className="font-display text-2xl font-black uppercase">{group.label}</p>
              <p className="mt-2 text-sm font-bold text-asphalt/55">{group.items.length} activities</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {group.items.slice(0, 8).map((activity) => (
                <a
                  key={activity.id}
                  href={activity.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border-2 border-asphalt bg-paper px-3 py-2 font-display text-xs font-black uppercase transition hover:-translate-y-0.5 hover:bg-volt"
                >
                  {formatPrettyDate(activity.date)}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
