import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  /** Two-digit section index, e.g. "01". */
  index: string;
  label: ReactNode;
  title: ReactNode;
  /** Italic sub-line under the H2. */
  sub?: ReactNode;
  id?: string;
};

/** `index label (cols 1–3) + H2 (cols 4–12) + italic sub-line`. */
export function SectionHeader({ index, label, title, sub, id }: Props) {
  return (
    <div className="sec-head">
      <Reveal className="sec-idx">
        <div className="num">
          {index} / {label}
        </div>
      </Reveal>
      <Reveal as="h2" delay={1} id={id}>
        {title}
        {sub && <span className="en">{sub}</span>}
      </Reveal>
    </div>
  );
}
