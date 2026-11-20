import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"button">, "type"> & {
  selected?: boolean;
  /**
   * `radio` (default): single choice, use inside a role="radiogroup".
   * `toggle`: multi-select, exposes `aria-pressed` and a leading "✓ " when selected.
   */
  mode?: "radio" | "toggle";
};

/** Rounded selectable chip. */
export function Pill({ selected, mode = "radio", className, children, ...rest }: Props) {
  const toggle = mode === "toggle";
  return (
    <button
      type="button"
      {...(toggle ? { "aria-pressed": !!selected } : { role: "radio", "aria-checked": !!selected })}
      className={["pill", selected && "on", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {toggle && selected && <span aria-hidden="true">✓ </span>}
      {children}
    </button>
  );
}
