import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  detail: string;
  heatmapDays: Array<{ date: string; ran: boolean }>;
  icon: LucideIcon;
  index: number;
  label: string;
  suffix: string;
  value: string;
};

export function StatCard({ detail, heatmapDays, icon: Icon, index, label, suffix, value }: StatCardProps) {
  return (
    <article
      className="group animate-rise overflow-hidden border-2 border-asphalt bg-white p-5 shadow-hard transition hover:-translate-y-1"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-8 flex items-center justify-between">
        <p className="font-display text-xs font-black uppercase text-asphalt/55">{label}</p>
        <span className="grid h-10 w-10 place-items-center border-2 border-asphalt bg-paper transition group-hover:bg-volt">
          <Icon className="text-ember" size={22} />
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="font-display text-5xl font-black leading-none">{value}</span>
        <span className="mb-1 font-display text-sm font-black uppercase text-copper">{suffix}</span>
      </div>
      <p className="mt-4 text-sm font-bold text-asphalt/60">{detail}</p>
      <div className="mt-5 grid grid-cols-8 gap-1">
        {heatmapDays.slice(-8).map((day, barIndex) => (
          <span
            key={`${label}-${day.date}`}
            className={`border border-asphalt/20 ${day.ran ? "bg-ember" : "bg-fog"}`}
            style={{ height: `${barIndex % 3 === 0 ? 28 : barIndex % 3 === 1 ? 40 : 20}px` }}
          />
        ))}
      </div>
    </article>
  );
}
