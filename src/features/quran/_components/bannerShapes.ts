export const BANNER_H = 64;
export const MID = BANNER_H / 2;

export const petalPath = (cx: number, cy: number, r: number) =>
  `M ${cx} ${cy} C ${cx - r * 0.45} ${cy - r * 0.5}, ${cx - r * 0.32} ${cy - r}, ${cx} ${cy - r} C ${cx + r * 0.32} ${cy - r}, ${cx + r * 0.45} ${cy - r * 0.5}, ${cx} ${cy} Z`;

const spiral = (cx: number, cy: number, r: number, dir: 1 | -1) =>
  [
    `M ${cx + dir * r} ${cy}`,
    `a ${r} ${r} 0 1 1 ${-dir * r * 2} 0`,
    `a ${r * 0.65} ${r * 0.65} 0 1 1 ${dir * r * 1.3} 0`,
    `a ${r * 0.35} ${r * 0.35} 0 1 1 ${-dir * r * 0.7} 0`,
  ].join(" ");

export function scrolls(from: number, to: number) {
  const parts: string[] = [];
  for (let x = from; x < to; x += 22) {
    parts.push(spiral(x, MID - 7, 6, 1), spiral(x + 11, MID + 7, 6, -1));
  }
  return parts.join(" ");
}
