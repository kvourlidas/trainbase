import type { DashboardData } from "./types";

/** Demo data for the landing-page preview — matches the design reference. */
export function demoDashboard(name: string): DashboardData {
  return {
    name,
    week: { current: 6, total: 12 },
    workouts: { count: 23, deltaPerMonth: 4 },
    streak: { days: 14, best: 21 },
    volume: { tonnes: 8.4, deltaPct: 11 },
    oneRm: { lift: "Squat", points: [88, 92, 95, 100, 106, 110, 119, 127], deltaKg: 12 },
    weeklyVolume: {
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
      values: [48, 62, 55, 70, 66, 82, 90],
      currentIndex: 5,
    },
    today: {
      title: "Lower Body A",
      exercises: [
        { id: "squat", name: "Back Squat", prescription: "4×6 · 80kg", sets: 4, done: [true, true, false, false] },
        { id: "rdl", name: "Romanian Deadlift", prescription: "3×8 · 60kg", sets: 3, done: [false, false, false] },
        {
          id: "bss",
          name: "Bulgarian Split Squat",
          prescription: "3×10 · 14kg",
          sets: 3,
          done: [false, false, false],
        },
      ],
    },
  };
}
