type RunFlavorCardProps = {
  label: string;
  count: number;
  tone: "ember" | "volt" | "dark";
};

export function RunFlavorCard({ label, count, tone }: RunFlavorCardProps) {
  return (
    <div
      className={`border-2 border-asphalt p-4 shadow-hard ${
        tone === "dark" ? "bg-asphalt text-paper" : tone === "volt" ? "bg-volt text-asphalt" : "bg-ember text-paper"
      }`}
    >
      <p className="font-display text-4xl font-black">{count}</p>
      <p className="mt-2 font-display text-xs font-black uppercase tracking-[.18em]">{label}</p>
    </div>
  );
}
