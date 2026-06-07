import { Award, Flag, Gauge, Trophy } from "lucide-react";
import { GoalMeter } from "../molecules/GoalMeter";

type GoalsAndRecordsSectionProps = {
  bestMonthLabel: string;
  bestMonthRuns: number;
  currentMonthRuns: number;
  currentStreak: number;
  currentYearRuns: number;
  longestStreak: number;
  totalRuns: number;
};

export function GoalsAndRecordsSection({
  bestMonthLabel,
  bestMonthRuns,
  currentMonthRuns,
  currentStreak,
  currentYearRuns,
  longestStreak,
  totalRuns
}: GoalsAndRecordsSectionProps) {
  const records = [
    { label: "Longest streak", value: longestStreak, suffix: "days", icon: Trophy },
    { label: "Best month", value: bestMonthRuns, suffix: bestMonthLabel, icon: Award },
    { label: "Total logs", value: totalRuns, suffix: "runs", icon: Flag },
    { label: "Current pace", value: currentMonthRuns, suffix: "this month", icon: Gauge }
  ];

  return (
    <section id="goals" className="scroll-mt-28 mx-auto grid max-w-7xl gap-5 px-5 py-10 sm:px-8 lg:px-10">
      <div>
        <p className="font-display text-xs font-black uppercase tracking-[.22em] text-copper">Goals and records</p>
        <h2 className="mt-2 font-display text-4xl font-black uppercase">Chase board</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GoalMeter label="Year goal" value={currentYearRuns} target={220} />
        <GoalMeter label="Month goal" value={currentMonthRuns} target={24} accent="volt" />
        <GoalMeter label="Streak goal" value={currentStreak} target={30} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {records.map((record) => {
          const Icon = record.icon;
          return (
            <article key={record.label} className="border-2 border-asphalt bg-white p-5 shadow-hard">
              <div className="mb-8 flex items-center justify-between">
                <p className="font-display text-xs font-black uppercase text-asphalt/55">{record.label}</p>
                <Icon className="text-ember" size={22} />
              </div>
              <p className="font-display text-5xl font-black leading-none">{record.value}</p>
              <p className="mt-3 font-display text-xs font-black uppercase tracking-[.18em] text-copper">{record.suffix}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
