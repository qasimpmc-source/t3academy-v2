"use client";

interface Spoke {
  label: string;
  pct: number; // 0-100
}

interface Props {
  spokes: Spoke[];
  size?: number;
}

const GOLD = "#B87016";
const GOLD_LIGHT = "rgba(184,112,22,0.18)";
const DARK = "#1A1610";
const GRID = "rgba(184,112,22,0.25)";

export default function RadarChart({ spokes, size = 280 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.36;
  const n = spokes.length;

  const angle = (i: number) => (i / n) * 2 * Math.PI - Math.PI / 2;
  const pt = (i: number, r: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });

  // Build polygon path for data
  const dataPoints = spokes.map((s, i) => pt(i, maxR * (s.pct / 100)));
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Grid rings at 25 / 50 / 75 / 100 %
  const rings = [0.25, 0.5, 0.75, 1.0].map((frac) => {
    const pts = Array.from({ length: n }, (_, i) => pt(i, maxR * frac));
    return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  });

  // Label offset (outside the ring)
  const labelPt = (i: number) => pt(i, maxR + 22);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-label="Domain score radar chart"
    >
      {/* Grid rings */}
      {rings.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={GRID} strokeWidth={i === 3 ? 1.2 : 0.7} />
      ))}

      {/* Axis spokes */}
      {Array.from({ length: n }, (_, i) => {
        const end = pt(i, maxR);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke={GRID}
            strokeWidth={0.8}
          />
        );
      })}

      {/* Data fill */}
      <path d={dataPath} fill={GOLD_LIGHT} stroke={GOLD} strokeWidth={2} strokeLinejoin="round" />

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill={GOLD} />
      ))}

      {/* Centre dot */}
      <circle cx={cx} cy={cy} r={2.5} fill={DARK} opacity={0.3} />

      {/* Labels */}
      {spokes.map((s, i) => {
        const lp = labelPt(i);
        const short = s.label.length > 12 ? s.label.replace(" Reasoning", "") : s.label;
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={10}
            fontFamily="Trebuchet MS, system-ui, sans-serif"
            fontWeight="600"
            fill={DARK}
          >
            {short}
          </text>
        );
      })}

      {/* IQ values on each spoke */}
      {spokes.map((s, i) => {
        const vp = pt(i, maxR * (s.pct / 100));
        const angle_ = angle(i);
        const offset = 10;
        return (
          <text
            key={`val-${i}`}
            x={vp.x + offset * Math.cos(angle_)}
            y={vp.y + offset * Math.sin(angle_)}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={9}
            fontFamily="Trebuchet MS, system-ui, sans-serif"
            fontWeight="bold"
            fill={GOLD}
          >
            {s.pct}
          </text>
        );
      })}
    </svg>
  );
}
