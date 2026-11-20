import { z } from "zod";
import {
  equipmentOptions,
  fitnessLevels,
  goalOptions,
  isExclusiveEquipment,
  MAX_GOALS,
  MAX_NOTES,
  planIds,
  profileEnvs,
} from "@/config/pricing";
import { routing } from "@/i18n/routing";

/** Adapted-training intake, shared by the client form and /api/adapted-intake. */
export const intakeSchema = z.object({
  condition: z.string().trim().min(1).max(2000),
  details: z.string().trim().max(4000).optional().default(""),
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  locale: z.enum(routing.locales),
});
export type IntakeInput = z.infer<typeof intakeSchema>;

/** Training profile for Gym / Home Gym / Outdoor. Shared by the funnel, checkout and the account page. */
export const trainingProfileSchema = z
  .object({
    env: z.enum(profileEnvs),
    equipment: z.array(z.enum(equipmentOptions)).optional(),
    level: z.enum(fitnessLevels),
    goals: z.array(z.enum(goalOptions)).min(1).max(MAX_GOALS),
    notes: z.string().trim().max(MAX_NOTES).optional(),
  })
  .superRefine((v, ctx) => {
    const eq = v.equipment ?? [];
    if (new Set(v.goals).size !== v.goals.length) ctx.addIssue({ code: "custom", path: ["goals"], message: "duplicate" });
    if (new Set(eq).size !== eq.length) ctx.addIssue({ code: "custom", path: ["equipment"], message: "duplicate" });
    if (eq.length > 1 && eq.some(isExclusiveEquipment))
      ctx.addIssue({ code: "custom", path: ["equipment"], message: "exclusive" });
    if (v.env === "home" && eq.length === 0) ctx.addIssue({ code: "custom", path: ["equipment"], message: "required" });
  })
  // Equipment only applies to Home Gym.
  .transform((v) => (v.env === "home" ? v : { ...v, equipment: undefined }));
export type TrainingProfile = z.infer<typeof trainingProfileSchema>;

const plan = z.enum(planIds);
const locale = z.enum(routing.locales);

/** POST /api/checkout body. Gym/Home/Outdoor need a complete profile; Adapted needs an intake. */
export const checkoutSchema = z.union([
  z.object({ plan, locale, env: z.literal("adapted"), intakeId: z.string().min(1).max(64) }),
  z.object({ plan, locale, profile: trainingProfileSchema }),
]);
export type CheckoutInput = z.infer<typeof checkoutSchema>;
