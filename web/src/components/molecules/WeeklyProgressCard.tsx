import { CircleDot } from "lucide-react";
import type { WeekTotal } from "../../types";

type WeeklyProgressCardProps = {
  week: WeekTotal;
};

export function WeeklyProgressCard({ week }: WeeklyProgressCardProps) {
  return (
    <div className="border-2 border-asphalt bg-paper p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-xs font-black uppercase text-asphalt/55">{week.label}</p>
        <CircleDot size={18} className={week.count >= 5 ? "text-ember" : "text-asphalt/35"} />
      </div>
      <div className="flex h-28 items-end gap-1">
        {Array.from({ length: 7 }, (_, index) => (
          <span
            key={`${week.label}-${index}`}
            className={`flex-1 border-2 border-asphalt ${index < week.count ? "bg-ember" : "bg-fog"}`}
            style={{ height: `${28 + index * 8}%` }}
          />
        ))}
      </div>
      <p className="mt-3 font-display text-2xl font-black">{week.count}/7</p>
    </div>
  );
}
