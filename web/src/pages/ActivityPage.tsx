import { ActivityFeedSection } from "../components/organisms/ActivityFeedSection";
import { RouteWallSection } from "../components/organisms/RouteWallSection";
import { RunFlavorsSection } from "../components/organisms/RunFlavorsSection";
import { TimelineSection } from "../components/organisms/TimelineSection";
import { exerciseDates, stravaActivities } from "../data/run-data";
import { activityGroups, athleteImage, athleteUrl, latestActivity } from "../lib/dashboard-data";

export function ActivityPage() {
  return (
    <>
      <ActivityFeedSection
        activities={stravaActivities}
        athleteImage={athleteImage}
        athleteUrl={athleteUrl}
        exerciseDates={exerciseDates}
        latestActivity={latestActivity}
      />
      <TimelineSection groups={activityGroups} />
      <RunFlavorsSection dates={exerciseDates} />
      <RouteWallSection activities={stravaActivities} />
    </>
  );
}
