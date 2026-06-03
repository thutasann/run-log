export type ActivityPoint = {
  date: string;
  day: number;
  monthLabel: string;
  ran: boolean;
  isToday: boolean;
};

export type MonthlyTotal = {
  label: string;
  count: number;
};

export type WeekTotal = {
  label: string;
  count: number;
};
