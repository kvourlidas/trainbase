import type { ComponentPropsWithoutRef, ElementType } from "react";

type Props<T extends ElementType> = {
  as?: T;
  /** Stagger step: 1 → .1s, 2 → .2s, 3 → .3s. */
  delay?: 0 | 1 | 2 | 3;
} & ComponentPropsWithoutRef<T>;

/**
 * Scroll-reveal wrapper (40px translate + fade). Server component: it only
 * adds the `rv` classes; the single <RevealObserver /> in the layout adds `in`
 * when the element enters the viewport. Without JS the content is visible.
 */
export function Reveal<T extends ElementType = "div">({ as, delay = 0, className, ...rest }: Props<T>) {
  const Tag: ElementType = as ?? "div";
  const cls = ["rv", delay ? `d${delay}` : null, className].filter(Boolean).join(" ");
  return <Tag className={cls} {...rest} />;
}
