"use client";

import type { ReactNode } from "react";
import { buttonClass, Arrow } from "@/components/ui/Button";
import type { AuthTab } from "./AuthModal";
import { useUI } from "./UIProvider";

type Props = {
  tab: AuthTab;
  children: ReactNode;
  /** Render as a pill button; otherwise a plain text link-style button. */
  variant?: "ink" | "acc" | "line";
  size?: "sm";
  arrow?: boolean;
  className?: string;
};

/** Small client island so server components can open the auth modal. */
export function AuthTrigger({ tab, children, variant, size, arrow, className }: Props) {
  const { openAuth } = useUI();
  return (
    <button
      type="button"
      className={variant ? buttonClass({ variant, size, className }) : className}
      onClick={() => openAuth(tab)}
    >
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
