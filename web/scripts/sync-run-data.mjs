import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(webRoot, "..");

const [exercisesRaw, streakRaw, logsRaw] = await Promise.all([
  readFile(path.join(repoRoot, "exercises.json"), "utf8"),
  readFile(path.join(repoRoot, "streak.json"), "utf8"),
  readFile(path.join(repoRoot, "logs", "LOGS.md"), "utf8")
]);

const exercises = JSON.parse(exercisesRaw).exercises ?? [];
const streak = JSON.parse(streakRaw);
const stravaActivities = [];
const activityPattern =
  /^### (\d{4}-\d{2}-\d{2})\n(?:.|\n)*?\[View on Strava\]\((https:\/\/www\.strava\.com\/activities\/(\d+))\)/gm;

for (const match of logsRaw.matchAll(activityPattern)) {
  stravaActivities.push({
    date: match[1],
    id: match[3],
    url: match[2]
  });
}

const uniqueExerciseDates = [
  ...new Set(exercises.map((entry) => entry.date).filter(Boolean))
].sort();

const output = `export type StravaActivity = {
  date: string;
  id: string;
  url: string;
};

export const exerciseDates = ${JSON.stringify(uniqueExerciseDates, null, 2)} as const;

export const streak = ${JSON.stringify(streak, null, 2)} as const;

export const stravaActivities = ${JSON.stringify(stravaActivities, null, 2)} as const satisfies readonly StravaActivity[];
`;

const outputDir = path.join(webRoot, "src", "data");
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, "run-data.ts"), output);

console.log(
  `Synced ${uniqueExerciseDates.length} runs and ${stravaActivities.length} Strava activities.`
);
