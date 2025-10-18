"use client";

export default function Sparkline({ points = [2,5,4,6,8,7,9,12], width = 80, height = 28 }) {
  if (!points.length) return null;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = points.map((p) => (p - min) / (max - min || 1));
  const step = width / (points.length - 1);
  const d = norm.map((n, i) => `${i * step},${height - n * height}`).join(" ");
  return (
    <svg width={width} height={height} className="-mr-1">
      <polyline
        fill="none"
        stroke="#22C55E"
        strokeWidth="2"
        points={d}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
