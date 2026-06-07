type GoalMeterProps = {
  label: string;
  value: number;
  target: number;
  accent?: "ember" | "volt";
};

export function GoalMeter({ label, value, target, accent = "ember" }: GoalMeterProps) {
  const progress = Math.min(100, Math.round((value / target) * 100));

  return (
    <div className="border-2 border-asphalt bg-white p-4 shadow-hard">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-display text-sm font-black uppercase">{label}</p>
        <p className="font-display text-sm font-black text-asphalt/55">
          {value}/{target}
        </p>
      </div>
      <div className="h-5 border-2 border-asphalt bg-fog">
        <div className={`h-full ${accent === "ember" ? "bg-ember" : "bg-volt"}`} style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-3 font-display text-3xl font-black">{progress}%</p>
    </div>
  );
}
