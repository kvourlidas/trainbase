import type { Env } from "@/config/pricing";

/** Line icons from the reference; `.a` paths turn accent when the tile is active. */
export function EnvIcon({ env }: { env: Env }) {
  switch (env) {
    case "gym":
      return (
        <svg viewBox="0 0 60 60" aria-hidden="true">
          <path d="M8 30h44" />
          <rect className="a" x="12" y="20" width="6" height="20" />
          <rect className="a" x="42" y="20" width="6" height="20" />
          <rect x="5" y="24" width="7" height="12" />
          <rect x="48" y="24" width="7" height="12" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 60 60" aria-hidden="true">
          <path d="M8 28L30 10l22 18v22H8z" />
          <path className="a" d="M20 40h20M24 36v8M36 36v8" />
        </svg>
      );
    case "outdoor":
      return (
        <svg viewBox="0 0 60 60" aria-hidden="true">
          <circle className="a" cx="42" cy="16" r="7" />
          <path d="M4 48l16-20 10 12 8-8 18 16z" />
        </svg>
      );
    case "adapted":
      return (
        <svg viewBox="0 0 60 60" aria-hidden="true">
          <circle cx="30" cy="30" r="22" />
          <path className="a" d="M30 14v32M14 30h32" />
        </svg>
      );
  }
}
