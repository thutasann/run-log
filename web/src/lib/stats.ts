import type { ActivityPoint, MonthlyTotal, WeekTotal } from "../types";

const dayMs = 24 * 60 * 60 * 1000;

export const toDate = (value: string) => new Date(`${value}T00:00:00`);

export const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatPrettyDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(toDate(value));

export const getConsistency = (dates: readonly string[], todayKey: string) => {
  if (!dates.length) return 0;
  const first = toDate(dates[0]);
  const today = toDate(todayKey);
  const totalDays = Math.max(1, Math.floor((today.getTime() - first.getTime()) / dayMs) + 1);
  return Math.round((dates.length / totalDays) * 1000) / 10;
};

export const getLongestStreak = (dates: readonly string[]) => {
  const sorted = [...dates].sort();
  let longest = 0;
  let current = 0;
  let previous: Date | null = null;

  for (const dateKey of sorted) {
    const date = toDate(dateKey);
    if (!previous || Math.round((date.getTime() - previous.getTime()) / dayMs) === 1) {
      current += 1;
    } else {
      current = 1;
    }
    longest = Math.max(longest, current);
    previous = date;
  }

  return longest;
};

export const getMonthGrid = (dates: readonly string[], todayKey: string): ActivityPoint[] => {
  const runSet = new Set(dates);
  const today = toDate(todayKey);
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const cells: ActivityPoint[] = [];

  for (let pad = 0; pad < start.getDay(); pad += 1) {
    cells.push({
      date: "",
      day: 0,
      monthLabel: "",
      ran: false,
      isToday: false
    });
  }

  for (let day = 1; day <= end.getDate(); day += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), day);
    const key = toDateKey(date);
    cells.push({
      date: key,
      day,
      monthLabel: new Intl.DateTimeFormat("en", { month: "short" }).format(date),
      ran: runSet.has(key),
      isToday: key === todayKey
    });
  }

  return cells;
};

export const getLastMonths = (dates: readonly string[], todayKey: string, count = 6): MonthlyTotal[] => {
  const runSet = new Set(dates);
  const today = toDate(todayKey);
  const months: MonthlyTotal[] = [];

  for (let offset = count - 1; offset >= 0; offset -= 1) {
    const cursor = new Date(today.getFullYear(), today.getMonth() - offset, 1);
    const month = cursor.getMonth();
    const year = cursor.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let monthCount = 0;

    for (let day = 1; day <= daysInMonth; day += 1) {
      if (runSet.has(toDateKey(new Date(year, month, day)))) monthCount += 1;
    }

    months.push({
      label: new Intl.DateTimeFormat("en", { month: "short" }).format(cursor),
      count: monthCount
    });
  }

  return months;
};

export const getLastWeeks = (dates: readonly string[], todayKey: string, count = 4): WeekTotal[] => {
  const runSet = new Set(dates);
  const today = toDate(todayKey);
  const weeks: WeekTotal[] = [];

  for (let offset = count - 1; offset >= 0; offset -= 1) {
    const end = new Date(today);
    end.setDate(today.getDate() - offset * 7);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);

    let weekCount = 0;
    for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
      if (runSet.has(toDateKey(cursor))) weekCount += 1;
    }

    weeks.push({
      label: `${start.getMonth() + 1}/${start.getDate()}-${end.getMonth() + 1}/${end.getDate()}`,
      count: weekCount
    });
  }

  return weeks;
};

export const getHeatmapDays = (dates: readonly string[], todayKey: string, count = 98) => {
  const runSet = new Set(dates);
  const today = toDate(todayKey);

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (count - 1 - index));
    const key = toDateKey(date);
    return {
      date: key,
      ran: runSet.has(key),
      weekday: date.getDay()
    };
  });
};
