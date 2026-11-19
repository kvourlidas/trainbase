import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  muted?: boolean;
  accent?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * 12px uppercase monospace label. Greek strings passed here must already be
 * written in unaccented capitals in the messages files — the CSS uppercase
 * transform is only relied on for Latin text.
 */
export function MonoLabel({ as: Tag = "span", muted, accent, className, children }: Props) {
  const cls = ["mono", muted && "muted", accent && "acc", className].filter(Boolean).join(" ");
  return <Tag className={cls}>{children}</Tag>;
}
