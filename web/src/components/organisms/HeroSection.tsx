import { ArrowUpRight, Sparkles } from "lucide-react";
import { AthleteAvatar } from "../atoms/AthleteAvatar";
import { formatPrettyDate } from "../../lib/stats";
import type { WeekTotal } from "../../types";

type HeroSectionProps = {
  athleteImage: string;
  athleteUrl: string;
  heatmapDays: Array<{ date: string; ran: boolean }>;
  maxWeek: number;
  streakDays: number;
  todayKey: string;
  weeklyTotals: WeekTotal[];
};

export function HeroSection({
  athleteImage,
  athleteUrl,
  heatmapDays,
  maxWeek,
  streakDays,
  todayKey,
  weeklyTotals
}: HeroSectionProps) {
  return (
    <section className="relative isolate border-b-2 border-asphalt bg-[linear-gradient(135deg,#fff8ea_0%,#f5ead1_46%,#d9fb6f_100%)]">
      <div className="absolute inset-0 -z-10 bg-grid bg-[size:28px_28px]" />
      <div className="mx-auto grid min-h-[88vh] w-full max-w-7xl gap-10 px-5 py-6 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
        <div className="flex flex-col justify-between gap-10">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AthleteAvatar href={athleteUrl} image={athleteImage} label="Open Thuta Sann on Strava" />
              <div>
                <p className="font-display text-lg font-black uppercase leading-none">Run Log</p>
                <p className="text-xs font-bold uppercase tracking-[.24em] text-copper">Thuta Sann</p>
              </div>
            </div>
            <a
              href={athleteUrl}
              className="group inline-flex h-11 items-center gap-2 border-2 border-asphalt bg-asphalt px-4 font-display text-sm font-extrabold uppercase text-paper shadow-hard transition hover:-translate-y-0.5"
              target="_blank"
              rel="noreferrer"
            >
              Athlete
              <ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </nav>

          <div className="max-w-3xl animate-rise">
            <h1 className="font-display text-[clamp(3.3rem,10vw,8.4rem)] font-black uppercase leading-[.82] tracking-normal">
              Road work,
              <span className="block text-ember">logged.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-asphalt/78">
              Show up. Log miles. Stay moving.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {weeklyTotals.map((week, index) => (
              <div key={week.label} className="border-2 border-asphalt bg-paper p-4 shadow-hard">
                <div className="mb-3 flex items-center justify-between font-display text-xs font-black uppercase">
                  <span>{week.label}</span>
                  <span>{week.count}/7</span>
                </div>
                <div className="h-3 border-2 border-asphalt bg-fog">
                  <div className="h-full bg-ember" style={{ width: `${Math.max(8, (week.count / maxWeek) * 100)}%` }} />
                </div>
                <p className="mt-2 text-xs font-bold uppercase text-asphalt/55">Week {index + 1}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-end">
          <div className="w-full border-2 border-asphalt bg-asphalt p-4 text-paper shadow-hard sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-display text-sm font-black uppercase text-volt">Live streak</p>
                <p className="text-sm font-semibold text-paper/60">Updated {formatPrettyDate(todayKey)}</p>
              </div>
              <Sparkles className="text-volt" />
            </div>

            <div className="grid grid-cols-[auto_1fr] items-end gap-5 border-y-2 border-paper/15 py-8">
              <span className="font-display text-[8rem] font-black leading-none text-ember sm:text-[11rem]">
                {streakDays}
              </span>
              <div className="pb-4">
                <p className="font-display text-3xl font-black uppercase leading-none">day streak</p>
                <p className="mt-3 max-w-xs text-sm font-semibold leading-6 text-paper/65">
                  One run at a time, stacked into a streak worth keeping honest.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1">
              {heatmapDays.slice(-49).map((day) => (
                <span
                  key={day.date}
                  title={`${day.date}${day.ran ? " ran" : " rest"}`}
                  className={`aspect-square border border-paper/15 ${
                    day.ran ? "bg-volt shadow-[0_0_18px_rgba(216,255,79,.35)]" : "bg-paper/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
