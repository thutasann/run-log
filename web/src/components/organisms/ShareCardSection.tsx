type ShareCardSectionProps = {
  athleteImage: string;
  consistency: number;
  currentStreak: number;
  latestDate: string;
  totalRuns: number;
};

export function ShareCardSection({
  athleteImage,
  consistency,
  currentStreak,
  latestDate,
  totalRuns
}: ShareCardSectionProps) {
  return (
    <section id="share-card" className="scroll-mt-28">
      <div className="mb-6 flex items-end justify-between gap-5">
        <div>
          <p className="font-display text-xs font-black uppercase tracking-[.22em] text-copper">Social Share</p>
          <h2 className="mt-2 font-display text-4xl font-black uppercase">Post-ready</h2>
        </div>
      </div>
      <div className="border-2 border-asphalt bg-[linear-gradient(135deg,#171614_0%,#171614_54%,#d8ff4f_54%,#d8ff4f_100%)] p-5 text-paper shadow-hard">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-xs font-black uppercase tracking-[.24em] text-volt">Thuta run log</p>
            <h3 className="mt-3 font-display text-5xl font-black uppercase leading-none text-ember">Still moving</h3>
          </div>
          <img src={athleteImage} alt="Thuta Sann" className="h-16 w-16 border-2 border-paper object-cover" />
        </div>
        <div className="mt-10 grid grid-cols-3 gap-3">
          <div className="border-2 border-paper bg-asphalt p-3">
            <p className="font-display text-4xl font-black text-volt">{currentStreak}</p>
            <p className="text-xs font-black uppercase text-paper">Streak</p>
          </div>
          <div className="border-2 border-paper bg-asphalt p-3">
            <p className="font-display text-4xl font-black text-volt">{totalRuns}</p>
            <p className="text-xs font-black uppercase text-paper">Runs</p>
          </div>
          <div className="border-2 border-paper bg-asphalt p-3">
            <p className="font-display text-4xl font-black text-volt">{consistency}%</p>
            <p className="text-xs font-black uppercase text-paper">Rate</p>
          </div>
        </div>
        <p className="mt-8 inline-block border-2 border-paper bg-asphalt px-3 py-2 font-display text-sm font-black uppercase text-paper">
          Latest: {latestDate}
        </p>
      </div>
    </section>
  );
}
