import type { Env } from "@/config/pricing";

/** Dispatched by the Adapted CTA (and anything else) to preselect an environment. */
export const SELECT_ENV_EVENT = "tb:select-env";

export function selectEnv(env: Env) {
  window.dispatchEvent(new CustomEvent<Env>(SELECT_ENV_EVENT, { detail: env }));
  document.getElementById("programs")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}
