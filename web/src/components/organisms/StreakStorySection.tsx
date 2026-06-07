type StreakDay = {
  date: string;
  ran: boolean;
  label: string;
};

type StreakStorySectionProps = {
  days: StreakDay[];
};

export function StreakStorySection({ days }: StreakStorySectionProps) {
  return (
    <section id="streak-story" className="scroll-mt-28 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <div className="mb-6">
        <p className="font-display text-xs font-black uppercase tracking-[.22em] text-copper">Streak story</p>
        <h2 className="mt-2 font-display text-4xl font-black uppercase">The chain</h2>
      </div>
      <div className="grid gap-2 sm:grid-cols-7">
        {days.map((day, index) => (
          <div
            key={day.date}
            className={`border-2 border-asphalt p-3 shadow-hard ${
              day.ran ? "bg-volt text-asphalt" : "bg-white text-asphalt"
            }`}
          >
            <p className="font-display text-xs font-black uppercase">{day.label}</p>
            <p className="mt-5 font-display text-2xl font-black">{index + 1}</p>
            <p className={`mt-1 text-xs font-bold ${day.ran ? "text-asphalt" : "text-asphalt/70"}`}>
              {day.date.slice(5)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
