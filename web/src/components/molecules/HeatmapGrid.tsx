type HeatmapDay = {
  date: string;
  ran: boolean;
};

type HeatmapGridProps = {
  columns: HeatmapDay[][];
};

export function HeatmapGrid({ columns }: HeatmapGridProps) {
  return (
    <div className="overflow-x-auto border-2 border-asphalt bg-white p-5 shadow-hard">
      <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
        {columns.flatMap((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <span
              key={`${weekIndex}-${day.date}`}
              title={`${day.date}${day.ran ? " ran" : " rest"}`}
              className={`h-5 w-5 border border-asphalt/20 ${
                day.ran ? (dayIndex % 2 === 0 ? "bg-ember" : "bg-volt") : "bg-fog"
              }`}
            />
          ))
        )}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-black uppercase text-asphalt/55">
        <span>Less</span>
        <span className="h-4 w-4 border border-asphalt/20 bg-fog" />
        <span className="h-4 w-4 border border-asphalt/20 bg-ember" />
        <span className="h-4 w-4 border border-asphalt/20 bg-volt" />
        <span>More</span>
      </div>
    </div>
  );
}
