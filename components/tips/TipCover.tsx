import Image from "next/image";

/** Generated SVG covers from the reference, or an image path under /public. */
export function TipCover({ cover, alt }: { cover: string; alt: string }) {
  switch (cover) {
    case "bars":
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="400" height="300" fill="#0D0D0F" />
          <g fill="#FF4F1F">
            <rect x="60" y="200" width="40" height="60" />
            <rect x="120" y="170" width="40" height="90" />
            <rect x="180" y="135" width="40" height="125" />
            <rect x="240" y="95" width="40" height="165" />
            <rect x="300" y="50" width="40" height="210" />
          </g>
          <path d="M40 260h320" stroke="#EFEDE7" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="400" height="300" fill="#EFEDE7" />
          <circle cx="200" cy="150" r="90" fill="none" stroke="#0D0D0F" strokeWidth="2" />
          <circle
            cx="200"
            cy="150"
            r="90"
            fill="none"
            stroke="#FF4F1F"
            strokeWidth="14"
            strokeDasharray="420 600"
            transform="rotate(-90 200 150)"
          />
          <path d="M200 150V90M200 150l40 24" stroke="#0D0D0F" strokeWidth="4" />
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="400" height="300" fill="#FF4F1F" />
          <path
            d="M40 150 C 120 40, 280 260, 360 150"
            fill="none"
            stroke="#0D0D0F"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path d="M40 190 C 120 80, 280 300, 360 190" fill="none" stroke="#EFEDE7" strokeWidth="3" />
        </svg>
      );
    default:
      return <Image src={cover} alt={alt} fill sizes="(max-width: 980px) 100vw, 33vw" />;
  }
}
