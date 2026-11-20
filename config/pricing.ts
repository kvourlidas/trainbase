/**
 * Plans, features and Stripe price mapping.
 *
 * Prices are monthly, in EUR. While `amount` is `null` the UI renders the
 * outlined `XX€` placeholder from the design reference. To set a real price,
 * fill in `amount` and the matching STRIPE_PRICE_* env var.
 */
export const envs = ["gym", "home", "outdoor", "adapted"] as const;
export type Env = (typeof envs)[number];

/** Environments that use the training-profile form (Adapted has its own intake). */
export const profileEnvs = ["gym", "home", "outdoor"] as const;
export type ProfileEnv = (typeof profileEnvs)[number];
export const isProfileEnv = (env: Env): env is ProfileEnv => env !== "adapted";

/** Home Gym equipment, in display order. */
export const equipmentOptions = ["none", "bands", "dumbbells", "kettlebells", "bench", "pullup", "full"] as const;
export type Equipment = (typeof equipmentOptions)[number];
/** Options that can only be selected on their own. */
export const exclusiveEquipment = ["none", "full"] as const satisfies readonly Equipment[];
export type ExclusiveEquipment = (typeof exclusiveEquipment)[number];
export type EquipmentItem = Exclude<Equipment, ExclusiveEquipment>;
export const isExclusiveEquipment = (eq: Equipment): eq is ExclusiveEquipment =>
  (exclusiveEquipment as readonly Equipment[]).includes(eq);

export const fitnessLevels = ["beginner", "intermediate", "advanced"] as const;
export type FitnessLevel = (typeof fitnessLevels)[number];

export const goalOptions = ["fatloss", "muscle", "strength", "conditioning", "mobility", "health", "sport"] as const;
export type Goal = (typeof goalOptions)[number];
export const MAX_GOALS = 3;
export const MAX_NOTES = 1000;

export const planIds = ["program", "coach", "premium"] as const;
export type PlanId = (typeof planIds)[number];

export type PlanVariant = "standard" | "adapted";

export type CallPeriod = "week" | "month";
/** Online coaching-call allowance: `count` calls per calendar month or per ISO week. */
export type CallAllowance = { count: number; period: CallPeriod };

type PlanDefinition = {
  id: PlanId;
  /** Display name — intentionally English in both locales. */
  name: string;
  highlighted?: boolean;
  /** Coaching-call allowance (null = no recurring calls). Rendered as the first feature line. */
  calls: Record<PlanVariant, CallAllowance | null>;
  /** i18n keys under `plans.features.*`, listed after the calls line. */
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
    calls: { standard: null, adapted: null },
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
    calls: {
      standard: { count: 1, period: "month" },
      adapted: { count: 1, period: "month" },
    },
    features: {
      standard: ["weeklyCheck", "techniqueFeedback", "adjustments"],
      adapted: ["weeklyCheck", "adjustments"],
    },
    amount: { standard: null, adapted: null },
    stripePriceEnv: { standard: "STRIPE_PRICE_COACH", adapted: "STRIPE_PRICE_ADAPTED_COACH" },
  },
  {
    id: "premium",
    name: "Premium",
    includes: { standard: "everythingInCoach", adapted: "adaptedAssessment" },
    calls: {
      standard: { count: 1, period: "week" },
      adapted: { count: 1, period: "week" },
    },
    features: {
      standard: ["nutritionPlan", "nutritionMonitoring", "fullGuidance"],
      adapted: ["nutritionPlan", "fullGuidance"],
    },
    amount: { standard: null, adapted: null },
    stripePriceEnv: { standard: "STRIPE_PRICE_PREMIUM", adapted: "STRIPE_PRICE_ADAPTED_PREMIUM" },
  },
];

/**
 * Coaching-call allowance for a plan. Booking (not built yet) should enforce
 * `count` calls per calendar month (`"month"`) or per ISO week (`"week"`).
 */
export const getCallAllowance = (plan: PlanId, variant: PlanVariant): CallAllowance | null =>
  plans.find((p) => p.id === plan)?.calls[variant] ?? null;

/** i18n key under `plans.features.*` for the calls line; takes `{ count, period }`. */
export const callFeatureKey = (variant: PlanVariant) =>
  variant === "adapted" ? ("callsAdapted" as const) : ("calls" as const);

export const variantFor =(env: Env): PlanVariant => (env === "adapted" ? "adapted" : "standard");

/** Adapted plans are shown with an "Adapted " prefix, as in the reference. */
export const planDisplayName = (plan: PlanDefinition, env: Env) =>
  env === "adapted" ? `Adapted ${plan.name}` : plan.name;
