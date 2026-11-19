import { z } from "zod";
import { envs, equipmentOptions, planIds } from "@/config/pricing";
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

export const checkoutSchema = z
  .object({
    plan: z.enum(planIds),
    env: z.enum(envs),
    equipment: z.enum(equipmentOptions).optional(),
    locale: z.enum(routing.locales),
    intakeId: z.string().min(1).max(64).optional(),
  })
  .refine((v) => v.env !== "home" || !!v.equipment, { path: ["equipment"], message: "required" })
  .refine((v) => v.env !== "adapted" || !!v.intakeId, { path: ["intakeId"], message: "required" });
export type CheckoutInput = z.infer<typeof checkoutSchema>;
