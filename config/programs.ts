import { equipmentOptions, isExclusiveEquipment, type Equipment, type EquipmentItem, type ProfileEnv } from "./pricing";

/**
 * Default programs a new subscriber is auto-assigned to. `equipment` lists
 * what the program needs; an empty list means bodyweight only.
 * Ids are placeholders until the coach's program library exists.
 */
export type DefaultProgram = { id: string; env: ProfileEnv; equipment: EquipmentItem[] };

export const defaultPrograms: DefaultProgram[] = [
  { id: "gym-full", env: "gym", equipment: [] },
  { id: "outdoor-bodyweight", env: "outdoor", equipment: [] },
  { id: "home-bodyweight", env: "home", equipment: [] },
  { id: "home-bands", env: "home", equipment: ["bands"] },
  { id: "home-dumbbells", env: "home", equipment: ["dumbbells"] },
  { id: "home-kettlebells", env: "home", equipment: ["kettlebells"] },
  { id: "home-bands-pullup", env: "home", equipment: ["bands", "pullup"] },
  { id: "home-dumbbells-bench", env: "home", equipment: ["dumbbells", "bench"] },
  { id: "home-dumbbells-bench-pullup", env: "home", equipment: ["dumbbells", "bench", "pullup"] },
];

const allItems = equipmentOptions.filter((e): e is EquipmentItem => !isExclusiveEquipment(e));

/** What the user actually owns: `full` → everything, `none` → nothing. */
function ownedItems(equipment: readonly Equipment[]): Set<EquipmentItem> {
  if (equipment.includes("full")) return new Set(allItems);
  return new Set(equipment.filter((e): e is EquipmentItem => !isExclusiveEquipment(e)));
}

/**
 * Pick the default program for an environment: among programs whose required
 * equipment is a subset of the user's, the one that needs the most equipment.
 * Ties go to the earlier entry in `defaultPrograms`.
 */
export function assignDefaultProgram(env: ProfileEnv, equipment: readonly Equipment[] = []): DefaultProgram {
  const owned = ownedItems(equipment);
  let best: DefaultProgram | undefined;
  for (const p of defaultPrograms) {
    if (p.env !== env || !p.equipment.every((e) => owned.has(e))) continue;
    if (!best || p.equipment.length > best.equipment.length) best = p;
  }
  // Every env has a bodyweight program, so this only fires on a config mistake.
  if (!best) throw new Error(`No default program for env "${env}"`);
  return best;
}
