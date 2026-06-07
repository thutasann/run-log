import { Flame, Gauge, Route, Trophy } from "lucide-react";
import { exerciseDates, stravaActivities, streak } from "../data/run-data";
import {
  formatPrettyDate,
  getConsistency,
  getCurrentYearCount,
  getGroupedActivities,
  getHeatmapDays,
  getLastMonths,
  getLastWeeks,
  getLongestStreak,
  getMonthGrid,
  getStreakChain,
  getYearMonths
} from "./stats";

export const todayKey = streak.last_updated;
export const athleteUrl = "https://www.strava.com/athletes/139834408";
export const athleteImage =
  "https://lh3.googleusercontent.com/a/ACg8ocJvE4qXcxxq_J5YMHfKXlvFns_kkUXvUlj-kUL5TKWEZaLkY0Q=s96-c";
export const heatmapDays = getHeatmapDays(exerciseDates, todayKey);
export const latestActivity = stravaActivities[0] ?? { date: todayKey, id: "latest", url: "#" };
export const monthlyTotals = getLastMonths(exerciseDates, todayKey);
export const weeklyTotals = getLastWeeks(exerciseDates, todayKey);
export const maxMonth = Math.max(...monthlyTotals.map((month) => month.count), 1);
export const maxWeek = Math.max(...weeklyTotals.map((week) => week.count), 1);
export const currentMonthLabel = new Intl.DateTimeFormat("en", { month: "long" }).format(new Date(`${todayKey}T00:00:00`));
export const bestMonth = monthlyTotals.reduce(
  (best, month) => (month.count > best.count ? month : best),
  monthlyTotals[0]
);
export const recentRunStack = exerciseDates
  .slice(-7)
  .reverse()
  .map((date, index) => ({
    date,
    label: formatPrettyDate(date),
    offset: index
  }));
export const heatmapColumns = Array.from({ length: Math.ceil(heatmapDays.length / 7) }, (_, index) =>
  heatmapDays.slice(index * 7, index * 7 + 7)
);
export const currentYear = new Date(`${todayKey}T00:00:00`).getFullYear();
export const currentYearRuns = getCurrentYearCount(exerciseDates, currentYear);
export const monthGrid = getMonthGrid(exerciseDates, todayKey);
export const currentMonthRuns = monthGrid.filter((day) => day.ran).length;
export const longestStreak = getLongestStreak(exerciseDates);
export const consistency = getConsistency(exerciseDates, todayKey);
export const yearMonths = getYearMonths(exerciseDates, currentYear);
export const streakChain = getStreakChain(exerciseDates, todayKey);
export const activityGroups = getGroupedActivities(stravaActivities);

export const statCards = [
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
    detail: `${stravaActivities.length} activity entries`,
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
