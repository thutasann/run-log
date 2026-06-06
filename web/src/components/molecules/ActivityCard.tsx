import { ArrowUpRight } from "lucide-react";
import { formatPrettyDate } from "../../lib/stats";

type ActivityCardProps = {
  id: string;
  date: string;
  url: string;
  index: number;
};

export function ActivityCard({ id, date, url, index }: ActivityCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-2 border-asphalt bg-white p-4 shadow-hard transition hover:-translate-y-0.5 hover:bg-volt"
    >
      <span className="grid h-10 w-10 place-items-center border-2 border-asphalt bg-ember font-display text-sm font-black text-paper">
        {index + 1}
      </span>
      <span>
        <span className="block font-display text-base font-black uppercase">{formatPrettyDate(date)}</span>
        <span className="block text-sm font-bold text-asphalt/58">Activity #{id}</span>
      </span>
      <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
