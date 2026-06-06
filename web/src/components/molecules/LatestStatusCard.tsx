import { Activity, ArrowUpRight } from "lucide-react";
import { AthleteAvatar } from "../atoms/AthleteAvatar";
import { formatPrettyDate } from "../../lib/stats";
import type { StravaActivity } from "../../data/run-data";

type LatestStatusCardProps = {
  athleteImage: string;
  athleteUrl: string;
  latestActivity: Pick<StravaActivity, "date" | "id" | "url">;
  recentActivities: readonly StravaActivity[];
};

export function LatestStatusCard({ athleteImage, athleteUrl, latestActivity, recentActivities }: LatestStatusCardProps) {
  return (
    <aside className="border-2 border-asphalt bg-asphalt p-5 text-paper shadow-hard">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <AthleteAvatar href={athleteUrl} image={athleteImage} label="Open Strava athlete profile" size="lg" tone="dark" />
          </div>
          <div>
            <p className="font-display text-xs font-black uppercase tracking-[.22em] text-volt">Thuta Sann</p>
            <h3 className="mt-3 font-display text-5xl font-black uppercase leading-none text-ember">Ran</h3>
          </div>
        </div>
        <span className="grid h-12 w-12 place-items-center border-2 border-paper/25 bg-paper/10">
          <Activity className="text-volt" />
        </span>
      </div>

      <div className="my-8 border-y-2 border-paper/15 py-8">
        <p className="font-display text-2xl font-black uppercase">{formatPrettyDate(latestActivity.date)}</p>
        <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-paper/65">
          Activity #{latestActivity.id} is the newest Strava record in the generated feed.
        </p>
        <a
          href={latestActivity.url}
          className="mt-6 inline-flex h-11 items-center gap-2 border-2 border-volt bg-volt px-4 font-display text-sm font-black uppercase text-asphalt transition hover:-translate-y-0.5"
          target="_blank"
          rel="noreferrer"
        >
          Open on Strava
          <ArrowUpRight size={17} />
        </a>
      </div>

      <div className="grid gap-3">
        {recentActivities.slice(1, 5).map((activity) => (
          <a
            key={activity.id}
            href={activity.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border-2 border-paper/15 bg-paper/5 px-4 py-3 transition hover:border-volt hover:bg-paper/10"
          >
            <span>
              <span className="block font-display text-sm font-black uppercase">{formatPrettyDate(activity.date)}</span>
              <span className="block text-xs font-bold text-paper/45">#{activity.id}</span>
            </span>
            <ArrowUpRight size={17} />
          </a>
        ))}
      </div>
    </aside>
  );
}
