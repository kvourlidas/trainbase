import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"button">, "type"> & { selected?: boolean };

/** Rounded selectable chip. Use inside a role="radiogroup" for single choice. */
export function Pill({ selected, className, ...rest }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={!!selected}
      className={["pill", selected && "on", className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
