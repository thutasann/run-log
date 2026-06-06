import { Flame, Gauge, Route, Trophy } from "lucide-react";
import { ActivityFeedSection } from "./components/organisms/ActivityFeedSection";
import { HeatmapSection } from "./components/organisms/HeatmapSection";
import { HeroSection } from "./components/organisms/HeroSection";
import { MomentumSection } from "./components/organisms/MomentumSection";
import { MonthOverviewSection } from "./components/organisms/MonthOverviewSection";
import { StatsSection } from "./components/organisms/StatsSection";
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
const heatmapDays = getHeatmapDays(exerciseDates, todayKey);
const latestActivity = stravaActivities[0] ?? { date: todayKey, id: "latest", url: "#" };
const athleteUrl = "https://www.strava.com/athletes/139834408";
const athleteImage =
  "https://lh3.googleusercontent.com/a/ACg8ocJvE4qXcxxq_J5YMHfKXlvFns_kkUXvUlj-kUL5TKWEZaLkY0Q=s96-c";
const monthlyTotals = getLastMonths(exerciseDates, todayKey);
const weeklyTotals = getLastWeeks(exerciseDates, todayKey);
const maxMonth = Math.max(...monthlyTotals.map((month) => month.count), 1);
const maxWeek = Math.max(...weeklyTotals.map((week) => week.count), 1);
const currentMonthLabel = new Intl.DateTimeFormat("en", { month: "long" }).format(new Date(`${todayKey}T00:00:00`));
const bestMonth = monthlyTotals.reduce(
  (best, month) => (month.count > best.count ? month : best),
  monthlyTotals[0]
);
const recentRunStack = exerciseDates
  .slice(-7)
  .reverse()
  .map((date, index) => ({
    date,
    label: formatPrettyDate(date),
    offset: index
  }));
const heatmapColumns = Array.from({ length: Math.ceil(heatmapDays.length / 7) }, (_, index) =>
  heatmapDays.slice(index * 7, index * 7 + 7)
);

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
    value: `${getLongestStreak(exerciseDates)}`,
    suffix: "days",
    detail: "Best continuous block",
    icon: Trophy
  },
  {
    label: "Consistency",
    value: `${getConsistency(exerciseDates, todayKey)}`,
    suffix: "%",
    detail: `Since ${formatPrettyDate(exerciseDates[0])}`,
    icon: Gauge
  }
];

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-asphalt">
      <HeroSection
        athleteImage={athleteImage}
        athleteUrl={athleteUrl}
        heatmapDays={heatmapDays}
        maxWeek={maxWeek}
        streakDays={streak.current_streak}
        todayKey={todayKey}
        weeklyTotals={weeklyTotals}
      />
      <StatsSection heatmapDays={heatmapDays} stats={statCards} />
      <MomentumSection bestMonth={bestMonth} recentRunStack={recentRunStack} weeklyTotals={weeklyTotals} />
      <MonthOverviewSection
        currentMonthLabel={currentMonthLabel}
        maxMonth={maxMonth}
        monthGrid={getMonthGrid(exerciseDates, todayKey)}
        monthlyTotals={monthlyTotals}
        totalActivities={stravaActivities.length}
      />
      <HeatmapSection columns={heatmapColumns} />
      <ActivityFeedSection
        activities={stravaActivities}
        athleteImage={athleteImage}
        athleteUrl={athleteUrl}
        exerciseDates={exerciseDates}
        latestActivity={latestActivity}
      />
    </main>
  );
}

export default App;
