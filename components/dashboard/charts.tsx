/** Lightweight SVG charts in the reference style. Animation is CSS-driven via the `.in` class. */

type LineProps = { points: number[]; width?: number; height?: number };

/** Map values onto the reference's 400×180 viewBox, leaving headroom top and bottom. */
function toCoords(points: number[], width: number) {
  if (points.length === 0) return [];
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const top = 52;
  const bottom = 150;
  return points.map((v, i) => ({
    x: points.length === 1 ? width : Math.round((i / (points.length - 1)) * width),
    y: Math.round(bottom - ((v - min) / span) * (bottom - top)),
  }));
}

export function LineChart({ points, width = 400, height = 180 }: LineProps) {
  const c = toCoords(points, width);
  if (!c.length) return <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true" />;
  const line = c.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
  const area = `${line} L${width} ${height} L0 ${height}Z`;
  const last = c[c.length - 1];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <g stroke="rgba(239,237,231,.08)">
        <path d="M0 30h400M0 75h400M0 120h400M0 165h400" />
      </g>
      <path className="area" d={area} fill="rgba(255,79,31,.12)" />
      <path className="ln" d={line} fill="none" stroke="#FF4F1F" strokeWidth="2.5" />
      <circle className="area" cx={last.x} cy={last.y} r="5" fill="#FF4F1F" />
    </svg>
  );
}

type BarsProps = { labels: string[]; values: number[]; currentIndex: number };

export function BarChart({ labels, values, currentIndex }: BarsProps) {
  const max = Math.max(...values, 1);
  return (
    <div className="bars" aria-hidden="true">
      {values.map((v, i) => (
        <div key={i}>
          <i
            className={i === currentIndex ? "t" : undefined}
            style={{ "--h": `${Math.round((v / max) * 90)}%` } as React.CSSProperties}
          />
          <span>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}
