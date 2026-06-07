import { ArrowUpRight, Map } from "lucide-react";
import type { StravaActivity } from "../../data/run-data";

type RouteWallSectionProps = {
  activities: readonly StravaActivity[];
};

export function RouteWallSection({ activities }: RouteWallSectionProps) {
  return (
    <section id="routes" className="scroll-mt-28 border-y-2 border-asphalt bg-paper py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="font-display text-xs font-black uppercase tracking-[.22em] text-copper">Route wall</p>
            <h2 className="mt-2 font-display text-4xl font-black uppercase">Latest routes</h2>
          </div>
          <Map className="hidden text-ember sm:block" size={34} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activities.slice(0, 8).map((activity, index) => (
            <a
              key={activity.id}
              href={activity.url}
              target="_blank"
              rel="noreferrer"
              className="group border-2 border-asphalt bg-white p-4 shadow-hard transition hover:-translate-y-0.5"
            >
              <div className="mb-6 grid h-28 place-items-center border-2 border-asphalt bg-grid bg-[size:18px_18px]">
                <div className="h-14 w-24 rotate-[-8deg] border-4 border-ember bg-transparent" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-xs font-black uppercase text-copper">Route {index + 1}</p>
                  <p className="mt-1 font-display text-sm font-black uppercase">#{activity.id}</p>
                </div>
                <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
