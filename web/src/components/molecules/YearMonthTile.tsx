type YearMonthTileProps = {
  count: number;
  daysInMonth: number;
  label: string;
};

export function YearMonthTile({ count, daysInMonth, label }: YearMonthTileProps) {
  const intensity = count / daysInMonth;
  const fill = intensity > 0.7 ? "bg-volt" : intensity > 0.45 ? "bg-ember" : intensity > 0 ? "bg-paper" : "bg-fog";

  return (
    <div className={`border-2 border-asphalt p-3 text-asphalt ${fill}`}>
      <div className="mb-5 flex items-center justify-between">
        <p className="font-display text-xs font-black uppercase">{label}</p>
        <p className="font-display text-xs font-black">{count}</p>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: daysInMonth }, (_, index) => (
          <span
            key={`${label}-${index}`}
            className={`aspect-square border border-asphalt/30 ${index < count ? "bg-asphalt" : "bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}
