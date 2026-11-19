"use client";

import { Arrow } from "@/components/ui/Button";
import { selectEnv } from "./programs/events";

/** Selects the Adapted environment in Programs and scrolls there. */
export function AdaptedCta({ label }: { label: string }) {
  return (
    <a
      href="?env=adapted#programs"
      className="btn btn-ink"
      onClick={(e) => {
        e.preventDefault();
        selectEnv("adapted");
      }}
    >
      {label} <Arrow />
    </a>
  );
}
