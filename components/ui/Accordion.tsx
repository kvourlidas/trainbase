"use client";

import { useId, useState } from "react";

type Item = { q: string; a: string };

/** FAQ accordion; animates via grid-template-rows 0fr → 1fr. */
export function Accordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen === null ? [] : [defaultOpen]));
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={i} className={isOpen ? "qa open" : "qa"}>
            <h3>
              <button id={btnId} aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(i)}>
                <span>{item.q}</span>
                <span className="pm" aria-hidden="true" />
              </button>
            </h3>
            <div className="ans" id={panelId} role="region" aria-labelledby={btnId} inert={!isOpen}>
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
