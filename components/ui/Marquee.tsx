type Props = { words: string[] };

/** Infinite horizontal scroll; every second word is outlined. Decorative. */
export function Marquee({ words }: Props) {
  // The track holds two copies and animates to -50% for a seamless loop.
  const copy = (k: string) =>
    words.map((w, i) => (
      <span key={`${k}${i}`}>
        {i % 2 ? <em>{w}</em> : w}
        <i />
      </span>
    ));
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {copy("a")}
        {copy("b")}
      </div>
    </div>
  );
}
