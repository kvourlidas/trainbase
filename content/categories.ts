export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: "home" | "dumbbell" | "bodyweight" | "adaptive";
};

export const categories: Category[] = [
  {
    slug: "home-workouts",
    name: "Home Workouts",
    description:
      "No gym, no problem. Structured strength and conditioning sessions that use minimal equipment so you can train in your living room.",
    icon: "home",
  },
  {
    slug: "gym-programs",
    name: "Gym Programs",
    description:
      "Progressive strength programs built around barbells, dumbbells, and machines for lifters who want a structured plan on the gym floor.",
    icon: "dumbbell",
  },
  {
    slug: "calisthenics",
    name: "Calisthenics",
    description:
      "Bodyweight skill and strength progressions, from your first push-up to pull-ups, dips, and beyond.",
    icon: "bodyweight",
  },
  {
    slug: "adaptive-fitness",
    name: "Adaptive Fitness",
    description:
      "Programs designed to be modified around injuries, mobility limitations, and individual needs, so training stays consistent and safe.",
    icon: "adaptive",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
