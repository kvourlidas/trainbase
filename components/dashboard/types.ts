export type DashboardExercise = {
  id: string;
  name: string;
  /** e.g. "4×6 · 80kg" */
  prescription: string;
  sets: number;
  done: boolean[];
};

export type DashboardData = {
  name: string;
  week: { current: number; total: number };
  workouts: { count: number; deltaPerMonth: number };
  streak: { days: number; best: number };
  /** Weekly volume in tonnes, with % change vs last week. */
  volume: { tonnes: number; deltaPct: number };
  oneRm: { lift: string; points: number[]; deltaKg: number };
  weeklyVolume: { labels: string[]; values: number[]; currentIndex: number };
  today: { title: string; exercises: DashboardExercise[] } | null;
};
