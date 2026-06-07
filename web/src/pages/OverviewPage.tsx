import { HeroSection } from "../components/organisms/HeroSection";
import { HeatmapSection } from "../components/organisms/HeatmapSection";
import { MomentumSection } from "../components/organisms/MomentumSection";
import { MonthOverviewSection } from "../components/organisms/MonthOverviewSection";
import { ShareCardSection } from "../components/organisms/ShareCardSection";
import { StatsSection } from "../components/organisms/StatsSection";
import { streak, stravaActivities } from "../data/run-data";
import {
  athleteImage,
  bestMonth,
  consistency,
  currentMonthLabel,
  heatmapColumns,
  heatmapDays,
  maxMonth,
  maxWeek,
  monthGrid,
  monthlyTotals,
  recentRunStack,
  statCards,
  todayKey,
  weeklyTotals
} from "../lib/dashboard-data";
import { formatPrettyDate } from "../lib/stats";

export function OverviewPage() {
  return (
    <>
      <HeroSection
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
        monthGrid={monthGrid}
        monthlyTotals={monthlyTotals}
        totalActivities={stravaActivities.length}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[.95fr_1.05fr] lg:px-10">
        <ShareCardSection
          athleteImage={athleteImage}
          consistency={consistency}
          currentStreak={streak.current_streak}
          latestDate={formatPrettyDate(todayKey)}
          totalRuns={streak.total_days}
        />
        <HeatmapSection columns={heatmapColumns} padded={false} />
      </section>
    </>
  );
}
