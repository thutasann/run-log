import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ActivityCard } from "../molecules/ActivityCard";
import { DateFilter } from "../molecules/DateFilter";
import { LatestStatusCard } from "../molecules/LatestStatusCard";
import { formatPrettyDate } from "../../lib/stats";
import type { StravaActivity } from "../../data/run-data";

type ActivityFeedSectionProps = {
  activities: readonly StravaActivity[];
  athleteImage: string;
  athleteUrl: string;
  exerciseDates: readonly string[];
  latestActivity: Pick<StravaActivity, "date" | "id" | "url">;
};

const monthTitle = (monthKey: string) =>
  new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(`${monthKey}-01T00:00:00`));

const shiftMonth = (monthKey: string, amount: number) => {
  const date = new Date(`${monthKey}-01T00:00:00`);
  date.setMonth(date.getMonth() + amount);
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}`;
};

const getFilterCalendar = (monthKey: string) => {
  const cursor = new Date(`${monthKey}-01T00:00:00`);
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = cursor.getDay();

  return [
    ...Array.from({ length: startDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      return `${monthKey}-${`${day}`.padStart(2, "0")}`;
    })
  ];
};

export function ActivityFeedSection({
  activities,
  athleteImage,
  athleteUrl,
  exerciseDates,
  latestActivity
}: ActivityFeedSectionProps) {
  const initialFilterMonth = latestActivity.date.slice(0, 7);
  const [filterMonth, setFilterMonth] = useState(initialFilterMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const runDateSet = useMemo(() => new Set(exerciseDates), [exerciseDates]);
  const activityDateSet = useMemo(() => new Set(activities.map((activity) => activity.date)), [activities]);
  const filterCalendar = useMemo(() => getFilterCalendar(filterMonth), [filterMonth]);
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      if (selectedDate) return activity.date === selectedDate;
      return activity.date.startsWith(filterMonth);
    });
  }, [activities, filterMonth, selectedDate]);
  const visibleActivities = filteredActivities.slice(0, 12);
  const filterLabel = selectedDate ? formatPrettyDate(selectedDate) : monthTitle(filterMonth);

  const moveFilterMonth = (amount: number) => {
    setFilterMonth((current) => shiftMonth(current, amount));
    setSelectedDate(null);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="font-display text-xs font-black uppercase tracking-[.22em] text-copper">Activity feed</p>
          <h2 className="mt-2 font-display text-4xl font-black uppercase">Run status</h2>
        </div>
        <a
          href={latestActivity.url}
          className="inline-flex h-11 w-fit items-center gap-2 border-2 border-asphalt bg-volt px-4 font-display text-sm font-black uppercase shadow-hard transition hover:-translate-y-0.5"
          target="_blank"
          rel="noreferrer"
        >
          Latest activity
          <ArrowUpRight size={17} />
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <div className="grid content-start gap-5">
          <DateFilter
            activeDayCount={filterCalendar.filter((date) => date && activityDateSet.has(date)).length}
            activityCount={filteredActivities.length}
            calendarDays={filterCalendar}
            filterLabel={filterLabel}
            hasActivity={(date) => activityDateSet.has(date)}
            hasRun={(date) => runDateSet.has(date)}
            monthLabel={monthTitle(filterMonth)}
            selectedDate={selectedDate}
            onClear={() => {
              setFilterMonth(initialFilterMonth);
              setSelectedDate(null);
            }}
            onNextMonth={() => moveFilterMonth(1)}
            onPreviousMonth={() => moveFilterMonth(-1)}
            onSelectDate={(date) => setSelectedDate((current) => (current === date ? null : date))}
          />

          <div className="grid gap-3">
            {visibleActivities.map((activity, index) => (
              <ActivityCard key={activity.id} {...activity} index={index} />
            ))}

            {!visibleActivities.length && (
              <div className="border-2 border-asphalt bg-white p-6 shadow-hard">
                <p className="font-display text-2xl font-black uppercase">No activity here</p>
                <p className="mt-2 text-sm font-bold text-asphalt/55">
                  Pick another day or jump to a different month.
                </p>
              </div>
            )}
          </div>
        </div>

        <LatestStatusCard
          athleteImage={athleteImage}
          athleteUrl={athleteUrl}
          latestActivity={latestActivity}
          recentActivities={activities.slice(0, 12)}
        />
      </div>
    </section>
  );
}
