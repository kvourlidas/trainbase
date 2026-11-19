/**
 * Plans, features and Stripe price mapping.
 *
 * Prices are monthly, in EUR. While `amount` is `null` the UI renders the
 * outlined `XX€` placeholder from the design reference. To set a real price,
 * fill in `amount` and the matching STRIPE_PRICE_* env var.
 */
export const envs = ["gym", "home", "outdoor", "adapted"] as const;
export type Env = (typeof envs)[number];

export const equipmentOptions = ["none", "bands", "dumbbells", "full"] as const;
export type Equipment = (typeof equipmentOptions)[number];

export const planIds = ["program", "coach", "premium"] as const;
export type PlanId = (typeof planIds)[number];

export type PlanVariant = "standard" | "adapted";

type PlanDefinition = {
  id: PlanId;
  /** Display name — intentionally English in both locales. */
  name: string;
  highlighted?: boolean;
  /** i18n keys under `plans.features.*`. */
  features: Record<PlanVariant, string[]>;
  /** i18n key under `plans.includes.*`. */
  includes: Record<PlanVariant, string>;
  /** Monthly price in EUR, or null to show the placeholder. */
  amount: Record<PlanVariant, number | null>;
  /** Server-only env var holding the Stripe Price ID. */
  stripePriceEnv: Record<PlanVariant, string>;
};

export const plans: PlanDefinition[] = [
  {
    id: "program",
    name: "Program",
    includes: { standard: "program", adapted: "adaptedProgram" },
    features: {
      standard: ["videos", "setsReps", "progression", "tracking"],
      adapted: ["assessmentCall", "videos", "tracking"],
    },
    amount: { standard: null, adapted: null },
    stripePriceEnv: { standard: "STRIPE_PRICE_PROGRAM", adapted: "STRIPE_PRICE_ADAPTED_PROGRAM" },
  },
  {
    id: "coach",
    name: "Coach",
    highlighted: true,
    includes: { standard: "everythingInProgram", adapted: "adaptedAssessment" },
    features: {
      standard: ["oneCall", "weeklyCheck", "techniqueFeedback", "adjustments"],
      adapted: ["oneCallAdapted", "weeklyCheck", "adjustments"],
    },
    amount: { standard: null, adapted: null },
    stripePriceEnv: { standard: "STRIPE_PRICE_COACH", adapted: "STRIPE_PRICE_ADAPTED_COACH" },
  },
  {
    id: "premium",
    name: "Premium",
    includes: { standard: "everythingInCoach", adapted: "adaptedAssessment" },
    features: {
      standard: ["twoCalls", "nutritionPlan", "nutritionMonitoring", "fullGuidance"],
      adapted: ["twoCallsAdapted", "nutritionPlan", "fullGuidance"],
    },
    amount: { standard: null, adapted: null },
    stripePriceEnv: { standard: "STRIPE_PRICE_PREMIUM", adapted: "STRIPE_PRICE_ADAPTED_PREMIUM" },
  },
];

export const variantFor = (env: Env): PlanVariant => (env === "adapted" ? "adapted" : "standard");

/** Adapted plans are shown with an "Adapted " prefix, as in the reference. */
export const planDisplayName = (plan: PlanDefinition, env: Env) =>
  env === "adapted" ? `Adapted ${plan.name}` : plan.name;
