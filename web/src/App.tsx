import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Flame,
  Gauge,
  Route,
  Sparkles,
  Trophy
} from "lucide-react";
import { exerciseDates, stravaActivities, streak } from "./data/run-data";
import {
  formatPrettyDate,
  getConsistency,
  getHeatmapDays,
  getLastMonths,
  getLastWeeks,
  getLongestStreak,
  getMonthGrid
} from "./lib/stats";

const todayKey = streak.last_updated;
const consistency = getConsistency(exerciseDates, todayKey);
const longestStreak = getLongestStreak(exerciseDates);
const monthGrid = getMonthGrid(exerciseDates, todayKey);
const monthlyTotals = getLastMonths(exerciseDates, todayKey);
const weeklyTotals = getLastWeeks(exerciseDates, todayKey);
const heatmapDays = getHeatmapDays(exerciseDates, todayKey);
const recentStrava = stravaActivities.slice(0, 12);
const maxMonth = Math.max(...monthlyTotals.map((month) => month.count), 1);
const maxWeek = Math.max(...weeklyTotals.map((week) => week.count), 1);

const statCards = [
  {
    label: "Current streak",
    value: `${streak.current_streak}`,
    suffix: "days",
    detail: `Last run ${formatPrettyDate(streak.last_updated)}`,
    icon: Flame
  },
  {
    label: "Total running days",
    value: `${streak.total_days}`,
    suffix: "logs",
    detail: `${stravaActivities.length} linked on Strava`,
    icon: Route
  },
  {
    label: "Longest streak",
    value: `${longestStreak}`,
    suffix: "days",
    detail: "Best continuous block",
    icon: Trophy
  },
  {
    label: "Consistency",
    value: `${consistency}`,
    suffix: "%",
    detail: `Since ${formatPrettyDate(exerciseDates[0])}`,
    icon: Gauge
  }
];

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-asphalt">
      <section className="relative isolate border-b-2 border-asphalt bg-[linear-gradient(135deg,#fff8ea_0%,#f5ead1_46%,#d9fb6f_100%)]">
        <div className="absolute inset-0 -z-10 bg-grid bg-[size:28px_28px]" />
        <div className="mx-auto grid min-h-[88vh] w-full max-w-7xl gap-10 px-5 py-6 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
          <div className="flex flex-col justify-between gap-10">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center border-2 border-asphalt bg-ember text-paper shadow-hard">
                  <Activity size={22} strokeWidth={2.6} />
                </div>
                <div>
                  <p className="font-display text-lg font-black uppercase leading-none">Thuta Run Log</p>
                  <p className="text-xs font-bold uppercase tracking-[.24em] text-copper">Strava board</p>
                </div>
              </div>
              <a
                href={recentStrava[0]?.url}
                className="group inline-flex h-11 items-center gap-2 border-2 border-asphalt bg-asphalt px-4 font-display text-sm font-extrabold uppercase text-paper shadow-hard transition hover:-translate-y-0.5"
                target="_blank"
                rel="noreferrer"
              >
                Strava
                <ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </nav>

            <div className="max-w-3xl animate-rise">
              <h1 className="font-display text-[clamp(3.3rem,10vw,8.4rem)] font-black uppercase leading-[.82] tracking-normal">
                Road work,
                <span className="block text-ember">logged.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-asphalt/78">
                A compact public dashboard for streaks, consistency, calendar history, and every Strava
                activity currently stored in your tracker.
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
                    <div
                      className="h-full bg-ember"
                      style={{ width: `${Math.max(8, (week.count / maxWeek) * 100)}%` }}
                    />
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
                  {streak.current_streak}
                </span>
                <div className="pb-4">
                  <p className="font-display text-3xl font-black uppercase leading-none">day streak</p>
                  <p className="mt-3 max-w-xs text-sm font-semibold leading-6 text-paper/65">
                    Keep this panel public on Vercel, then plug in live Strava API data when you are ready.
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

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 sm:px-8 lg:grid-cols-4 lg:px-10">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <article
              key={stat.label}
              className="animate-rise border-2 border-asphalt bg-white p-5 shadow-hard"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="font-display text-xs font-black uppercase text-asphalt/55">{stat.label}</p>
                <Icon className="text-ember" size={22} />
              </div>
              <div className="flex items-end gap-2">
                <span className="font-display text-5xl font-black leading-none">{stat.value}</span>
                <span className="mb-1 font-display text-sm font-black uppercase text-copper">{stat.suffix}</span>
              </div>
              <p className="mt-4 text-sm font-bold text-asphalt/60">{stat.detail}</p>
            </article>
          );
        })}
      </section>

      <section className="border-y-2 border-asphalt bg-asphalt py-10 text-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-10">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <CalendarDays className="text-volt" />
              <h2 className="font-display text-3xl font-black uppercase">June map</h2>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <span key={`${day}-${index}`} className="pb-1 text-center font-display text-xs font-black text-paper/45">
                  {day}
                </span>
              ))}
              {monthGrid.map((day, index) => (
                <div
                  key={`${day.date}-${index}`}
                  className={`grid aspect-square place-items-center border-2 text-sm font-black ${
                    !day.date
                      ? "border-transparent"
                      : day.isToday
                        ? "border-volt bg-ember text-paper"
                        : day.ran
                          ? "border-volt bg-volt text-asphalt"
                          : "border-paper/15 bg-paper/5 text-paper/40"
                  }`}
                >
                  {day.day || ""}
                </div>
              ))}
            </div>
          </div>

          <div className="grid content-between gap-6">
            <div>
              <p className="mb-5 font-display text-xs font-black uppercase tracking-[.22em] text-volt">
                Last six months
              </p>
              <div className="grid gap-4">
                {monthlyTotals.map((month) => (
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

            <div className="border-2 border-paper/20 bg-paper/5 p-5">
              <p className="font-display text-2xl font-black uppercase text-volt">{stravaActivities.length}</p>
              <p className="mt-2 max-w-lg text-sm font-semibold leading-6 text-paper/65">
                Strava activities parsed from your markdown log. The feed below links straight to Strava
                so private or non-embeddable activities never break the public page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-xs font-black uppercase tracking-[.22em] text-copper">Activity feed</p>
            <h2 className="mt-2 font-display text-4xl font-black uppercase">Strava status</h2>
          </div>
          <a
            href={recentStrava[0]?.url}
            className="inline-flex h-11 w-fit items-center gap-2 border-2 border-asphalt bg-volt px-4 font-display text-sm font-black uppercase shadow-hard transition hover:-translate-y-0.5"
            target="_blank"
            rel="noreferrer"
          >
            Latest activity
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="grid gap-3">
            {recentStrava.map((activity, index) => (
              <a
                key={activity.id}
                href={activity.url}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-2 border-asphalt bg-white p-4 shadow-hard transition hover:-translate-y-0.5 hover:bg-volt"
              >
                <span className="grid h-10 w-10 place-items-center border-2 border-asphalt bg-ember font-display text-sm font-black text-paper">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-display text-base font-black uppercase">
                    {formatPrettyDate(activity.date)}
                  </span>
                  <span className="block text-sm font-bold text-asphalt/58">Activity #{activity.id}</span>
                </span>
                <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>

          <aside className="border-2 border-asphalt bg-asphalt p-5 text-paper shadow-hard">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-display text-xs font-black uppercase tracking-[.22em] text-volt">
                  Latest status
                </p>
                <h3 className="mt-3 font-display text-5xl font-black uppercase leading-none text-ember">
                  Ran
                </h3>
              </div>
              <span className="grid h-12 w-12 place-items-center border-2 border-paper/25 bg-paper/10">
                <Activity className="text-volt" />
              </span>
            </div>

            <div className="my-8 border-y-2 border-paper/15 py-8">
              <p className="font-display text-2xl font-black uppercase">{formatPrettyDate(recentStrava[0].date)}</p>
              <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-paper/65">
                Activity #{recentStrava[0].id} is the newest Strava record in the generated feed.
              </p>
              <a
                href={recentStrava[0].url}
                className="mt-6 inline-flex h-11 items-center gap-2 border-2 border-volt bg-volt px-4 font-display text-sm font-black uppercase text-asphalt transition hover:-translate-y-0.5"
                target="_blank"
                rel="noreferrer"
              >
                Open on Strava
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="grid gap-3">
              {recentStrava.slice(1, 5).map((activity) => (
                <a
                  key={activity.id}
                  href={activity.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border-2 border-paper/15 bg-paper/5 px-4 py-3 transition hover:border-volt hover:bg-paper/10"
                >
                  <span>
                    <span className="block font-display text-sm font-black uppercase">
                      {formatPrettyDate(activity.date)}
                    </span>
                    <span className="block text-xs font-bold text-paper/45">#{activity.id}</span>
                  </span>
                  <ArrowUpRight size={17} />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default App;
