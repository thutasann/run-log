import type { LucideIcon } from "lucide-react";
import { StatCard } from "../molecules/StatCard";

type StatItem = {
  detail: string;
  icon: LucideIcon;
  label: string;
  suffix: string;
  value: string;
};

type StatsSectionProps = {
  heatmapDays: Array<{ date: string; ran: boolean }>;
  stats: StatItem[];
};

export function StatsSection({ heatmapDays, stats }: StatsSectionProps) {
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 sm:px-8 lg:grid-cols-4 lg:px-10">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} {...stat} heatmapDays={heatmapDays} index={index} />
      ))}
    </section>
  );
}
