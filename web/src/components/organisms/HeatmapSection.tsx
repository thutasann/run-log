import { MapPinned } from "lucide-react";
import { SectionHeading } from "../atoms/SectionHeading";
import { HeatmapGrid } from "../molecules/HeatmapGrid";

type HeatmapSectionProps = {
  columns: Array<Array<{ date: string; ran: boolean }>>;
};

export function HeatmapSection({ columns }: HeatmapSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <div className="mb-6">
        <SectionHeading
          eyebrow="Heatmap calendar"
          title="98-day signal"
          icon={<MapPinned className="hidden text-ember sm:block" size={34} />}
        />
      </div>
      <HeatmapGrid columns={columns} />
    </section>
  );
}
