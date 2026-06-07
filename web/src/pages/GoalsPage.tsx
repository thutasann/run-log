import { GoalsAndRecordsSection } from "../components/organisms/GoalsAndRecordsSection";
import { StreakStorySection } from "../components/organisms/StreakStorySection";
import { YearRewindSection } from "../components/organisms/YearRewindSection";
import { streak } from "../data/run-data";
import {
  bestMonth,
  currentMonthRuns,
  currentYear,
  currentYearRuns,
  longestStreak,
  streakChain,
  yearMonths
} from "../lib/dashboard-data";

export function GoalsPage() {
  return (
    <>
      <GoalsAndRecordsSection
        bestMonthLabel={bestMonth.label}
        bestMonthRuns={bestMonth.count}
        currentMonthRuns={currentMonthRuns}
        currentStreak={streak.current_streak}
        currentYearRuns={currentYearRuns}
        longestStreak={longestStreak}
        totalRuns={streak.total_days}
      />
      <YearRewindSection months={yearMonths} total={currentYearRuns} year={currentYear} />
      <StreakStorySection days={streakChain} />
    </>
  );
}
