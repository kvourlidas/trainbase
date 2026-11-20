import {
  equipmentOptions,
  fitnessLevels,
  goalOptions,
  isExclusiveEquipment,
  MAX_GOALS,
  type Equipment,
  type FitnessLevel,
  type Goal,
  type ProfileEnv,
} from "@/config/pricing";
import { assignDefaultProgram } from "@/config/programs";
import type { TrainingProfile } from "@/lib/schemas";

/** Profile as edited in the funnel; fields may be incomplete. */
export type ProfileDraft = {
  equipment: Equipment[];
  level: FitnessLevel | null;
  goals: Goal[];
  notes: string;
};

export const emptyDraft: ProfileDraft = { equipment: [], level: null, goals: [], notes: "" };

const byOrder = <T extends string>(order: readonly T[]) => (a: T, b: T) => order.indexOf(a) - order.indexOf(b);

/**
 * Toggle one equipment option. Exclusive options (`none`, `full`) clear
 * everything else; any other option clears the exclusive ones.
 */
export function toggleEquipment(current: readonly Equipment[], id: Equipment): Equipment[] {
  if (current.includes(id)) return current.filter((e) => e !== id);
  if (isExclusiveEquipment(id)) return [id];
  return [...current.filter((e) => !isExclusiveEquipment(e)), id].sort(byOrder(equipmentOptions));
}

/** Toggle a goal, ignoring additions past MAX_GOALS. */
export function toggleGoal(current: readonly Goal[], id: Goal): Goal[] {
  if (current.includes(id)) return current.filter((g) => g !== id);
  if (current.length >= MAX_GOALS) return [...current];
  return [...current, id];
}

export function isProfileComplete(env: ProfileEnv, d: ProfileDraft): boolean {
  return !!d.level && d.goals.length > 0 && (env !== "home" || d.equipment.length > 0);
}

export function draftToProfile(env: ProfileEnv, d: ProfileDraft): TrainingProfile | null {
  if (!isProfileComplete(env, d) || !d.level) return null;
  const notes = d.notes.trim();
  return {
    env,
    equipment: env === "home" ? d.equipment : undefined,
    level: d.level,
    goals: d.goals,
    notes: notes || undefined,
  };
}

/* ---------- URL query (`eq`, `lvl`, `goals`; notes are never in the URL) ---------- */

function parseList<T extends string>(raw: string | null, allowed: readonly T[]): T[] {
  if (!raw) return [];
  const seen = new Set<T>();
  for (const part of raw.split(",")) {
    const v = part.trim() as T;
    if (allowed.includes(v)) seen.add(v);
  }
  return [...seen];
}

export function draftFromQuery(q: URLSearchParams): Omit<ProfileDraft, "notes"> {
  // Replay as clicks (values are de-duplicated) so a hand-edited URL can't break exclusivity.
  const equipment = parseList(q.get("eq"), equipmentOptions).reduce<Equipment[]>(toggleEquipment, []);
  const lvl = q.get("lvl");
  const level = (fitnessLevels as readonly string[]).includes(lvl ?? "") ? (lvl as FitnessLevel) : null;
  const goals = parseList(q.get("goals"), goalOptions).slice(0, MAX_GOALS);
  return { equipment, level, goals };
}

export function writeDraftToQuery(url: URL, env: ProfileEnv | null, d: ProfileDraft) {
  const set = (key: string, value: string) =>
    value ? url.searchParams.set(key, value) : url.searchParams.delete(key);
  set("eq", env === "home" ? d.equipment.join(",") : "");
  set("lvl", env ? (d.level ?? "") : "");
  set("goals", env ? d.goals.join(",") : "");
}

/* ---------- Stripe metadata ---------- */

/** Stripe caps metadata values at 500 characters. */
export const STRIPE_METADATA_MAX = 500;

/**
 * Flatten a profile for Stripe session/subscription metadata: arrays become
 * comma-separated strings and notes are truncated. Keep the full notes in the DB.
 */
export function profileToStripeMetadata(p: TrainingProfile): Record<string, string> {
  const notes = p.notes ?? "";
  return {
    env: p.env,
    equipment: (p.equipment ?? []).join(","),
    fitness_level: p.level,
    goals: p.goals.join(","),
    coach_notes: notes.length > STRIPE_METADATA_MAX ? notes.slice(0, STRIPE_METADATA_MAX - 1) + "…" : notes,
    default_program: assignDefaultProgram(p.env, p.equipment).id,
  };
}
