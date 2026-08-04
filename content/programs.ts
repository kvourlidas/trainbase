export type Level = "beginner" | "intermediate" | "advanced";

export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  demoVideo?: string;
  demoImage: string;
  notes?: string;
};

export type Workout = {
  title: string;
  exercises: Exercise[];
};

export type Program = {
  slug: string;
  title: string;
  categorySlug: string;
  level: Level;
  summary: string;
  description: string;
  durationWeeks: number;
  sessionsPerWeek: number;
  equipment: string[];
  coverImage: string;
  workouts: Workout[];
};

const placeholderExerciseImage = "/placeholders/exercise-demo.svg";

export const programs: Program[] = [
  {
    slug: "beginner-home-strength",
    title: "Beginner Home Strength",
    categorySlug: "home-workouts",
    level: "beginner",
    summary:
      "A four-week introduction to full-body strength training using nothing but your bodyweight and a set of resistance bands.",
    description:
      "Beginner Home Strength is built for anyone starting from zero. Each week gradually adds volume and new movement patterns so your body adapts without burning out. No equipment is required beyond an optional resistance band, making it easy to follow anywhere you have a few square meters of floor space.",
    durationWeeks: 4,
    sessionsPerWeek: 3,
    equipment: ["Resistance band (optional)", "Exercise mat"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Week 1 — Full Body",
        exercises: [
          { name: "Bodyweight Squat", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
          { name: "Incline Push-Up", sets: 3, reps: "8-12", demoImage: placeholderExerciseImage },
          { name: "Glute Bridge", sets: 3, reps: "15", demoImage: placeholderExerciseImage },
          { name: "Band Row", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
          { name: "Plank Hold", sets: 3, reps: "20-30 sec", demoImage: placeholderExerciseImage },
        ],
      },
      {
        title: "Week 2 — Full Body",
        exercises: [
          { name: "Bodyweight Squat", sets: 3, reps: "15-18", demoImage: placeholderExerciseImage },
          { name: "Push-Up", sets: 3, reps: "8-10", demoImage: placeholderExerciseImage },
          { name: "Single-Leg Glute Bridge", sets: 3, reps: "10 per side", demoImage: placeholderExerciseImage },
          { name: "Band Row", sets: 3, reps: "15", demoImage: placeholderExerciseImage },
          { name: "Side Plank", sets: 3, reps: "15-20 sec per side", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "home-hiit-conditioning",
    title: "Home HIIT Conditioning",
    categorySlug: "home-workouts",
    level: "intermediate",
    summary:
      "Short, intense interval sessions designed to build conditioning in 25 minutes or less, no equipment needed.",
    description:
      "Home HIIT Conditioning packs a full cardiovascular and muscular endurance stimulus into short sessions. It's built for people with limited time who still want a hard, effective workout. Every session alternates work and rest intervals that scale with your fitness level.",
    durationWeeks: 6,
    sessionsPerWeek: 4,
    equipment: ["Exercise mat", "Timer / interval app"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Week 1 — Lower Body Intervals",
        exercises: [
          { name: "Jump Squat", sets: 4, reps: "30 sec on / 30 sec off", demoImage: placeholderExerciseImage },
          { name: "Mountain Climbers", sets: 4, reps: "30 sec on / 30 sec off", demoImage: placeholderExerciseImage },
          { name: "Reverse Lunge", sets: 4, reps: "30 sec on / 30 sec off", demoImage: placeholderExerciseImage },
          { name: "High Knees", sets: 4, reps: "30 sec on / 30 sec off", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "five-by-five-strength",
    title: "5x5 Gym Strength",
    categorySlug: "gym-programs",
    level: "intermediate",
    summary:
      "A classic linear progression program built around barbell squats, bench press, and deadlifts.",
    description:
      "5x5 Gym Strength is a straightforward, proven approach to building raw strength. Three sessions a week alternate between two full-body workouts, adding weight to the bar as long as you keep hitting your reps. It's ideal for lifters who want a simple plan and a barbell.",
    durationWeeks: 12,
    sessionsPerWeek: 3,
    equipment: ["Barbell", "Squat rack", "Bench"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Workout A",
        exercises: [
          { name: "Barbell Squat", sets: 5, reps: "5", demoImage: placeholderExerciseImage },
          { name: "Bench Press", sets: 5, reps: "5", demoImage: placeholderExerciseImage },
          { name: "Barbell Row", sets: 5, reps: "5", demoImage: placeholderExerciseImage },
        ],
      },
      {
        title: "Workout B",
        exercises: [
          { name: "Barbell Squat", sets: 5, reps: "5", demoImage: placeholderExerciseImage },
          { name: "Overhead Press", sets: 5, reps: "5", demoImage: placeholderExerciseImage },
          { name: "Deadlift", sets: 1, reps: "5", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "hypertrophy-upper-lower",
    title: "Hypertrophy Upper/Lower Split",
    categorySlug: "gym-programs",
    level: "advanced",
    summary:
      "A four-day upper/lower split focused on muscle growth using progressive overload and higher training volume.",
    description:
      "This program splits training into upper and lower body days run twice per week, giving each muscle group enough volume and frequency to grow while allowing adequate recovery. Best suited for lifters who already have a base of strength training experience.",
    durationWeeks: 8,
    sessionsPerWeek: 4,
    equipment: ["Full gym access", "Barbell", "Dumbbells", "Cables"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Upper Body A",
        exercises: [
          { name: "Bench Press", sets: 4, reps: "8-10", demoImage: placeholderExerciseImage },
          { name: "Lat Pulldown", sets: 4, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Seated Dumbbell Press", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Cable Row", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
        ],
      },
      {
        title: "Lower Body A",
        exercises: [
          { name: "Barbell Squat", sets: 4, reps: "8-10", demoImage: placeholderExerciseImage },
          { name: "Romanian Deadlift", sets: 3, reps: "10", demoImage: placeholderExerciseImage },
          { name: "Walking Lunge", sets: 3, reps: "12 per leg", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "calisthenics-foundations",
    title: "Calisthenics Foundations",
    categorySlug: "calisthenics",
    level: "beginner",
    summary:
      "Build the base strength you need for push-ups, pull-ups, and dips using scalable bodyweight progressions.",
    description:
      "Calisthenics Foundations breaks down fundamental bodyweight movements into progressions so you can build real strength even if you can't yet do a single pull-up or dip. Each week you'll test and progress to the next variation as you get stronger.",
    durationWeeks: 6,
    sessionsPerWeek: 3,
    equipment: ["Pull-up bar", "Parallel bars or sturdy chairs"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Week 1 — Push & Pull Foundations",
        exercises: [
          { name: "Incline Push-Up", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Negative Pull-Up", sets: 4, reps: "3-5", demoImage: placeholderExerciseImage },
          { name: "Bench Dip", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Scapular Pull", sets: 3, reps: "10", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "calisthenics-skills",
    title: "Calisthenics Skills: Muscle-Up Prep",
    categorySlug: "calisthenics",
    level: "advanced",
    summary:
      "A focused skill-building program for lifters chasing their first strict muscle-up.",
    description:
      "Muscle-Up Prep targets the specific strength and technique gaps that stop most people from getting their first muscle-up: pulling power, transition strength, and dip lockout. Requires an existing base of several strict pull-ups and dips.",
    durationWeeks: 8,
    sessionsPerWeek: 3,
    equipment: ["Pull-up bar", "Rings (recommended)"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Week 1 — Pulling Power",
        exercises: [
          { name: "Weighted Pull-Up", sets: 4, reps: "5", demoImage: placeholderExerciseImage },
          { name: "High Pull-Up", sets: 4, reps: "3-5", demoImage: placeholderExerciseImage },
          { name: "Ring Support Hold", sets: 3, reps: "20-30 sec", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "adaptive-seated-strength",
    title: "Seated Strength & Mobility",
    categorySlug: "adaptive-fitness",
    level: "beginner",
    summary:
      "A full seated strength and mobility program designed for wheelchair users and anyone training from a seated position.",
    description:
      "Seated Strength & Mobility builds functional upper-body strength, core control, and joint mobility entirely from a seated position. Movements are chosen for their adaptability, with modification notes throughout so the plan can be tailored to your specific needs and equipment.",
    durationWeeks: 6,
    sessionsPerWeek: 3,
    equipment: ["Dumbbells or resistance bands", "Stable chair or wheelchair"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Week 1 — Upper Body & Core",
        exercises: [
          { name: "Seated Dumbbell Press", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Seated Row", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
          { name: "Seated Core Twist", sets: 3, reps: "12 per side", demoImage: placeholderExerciseImage },
          { name: "Shoulder External Rotation", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "adaptive-low-impact-conditioning",
    title: "Low-Impact Adaptive Conditioning",
    categorySlug: "adaptive-fitness",
    level: "intermediate",
    summary:
      "Joint-friendly conditioning work that builds cardiovascular fitness without high-impact movements.",
    description:
      "Designed for anyone managing joint pain, past injuries, or mobility restrictions, this program builds cardiovascular conditioning through low-impact intervals and controlled tempo work. Every exercise includes a modification note so intensity can be adjusted to your current ability.",
    durationWeeks: 6,
    sessionsPerWeek: 3,
    equipment: ["Exercise mat", "Chair (for support, optional)"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Week 1 — Low-Impact Circuit",
        exercises: [
          { name: "Standing March", sets: 3, reps: "45 sec", demoImage: placeholderExerciseImage },
          { name: "Wall Push-Up", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Seated Leg Extension", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
          { name: "Standing Side Step", sets: 3, reps: "45 sec", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}

export function getProgramsByCategory(categorySlug: string): Program[] {
  return programs.filter((program) => program.categorySlug === categorySlug);
}
