export const BANNER_H = 64;
export const MID = BANNER_H / 2;

export function cartouchePath(left: number, right: number, inset: number) {
  const l = left + inset;
  const r = right - inset;
  const top = 8 + inset;
  const bottom = BANNER_H - 8 - inset;
  const k = 10;
  return [
    `M ${l} ${MID}`,
    `C ${l} ${MID - 8}, ${l + k} ${top}, ${l + k * 2} ${top}`,
    `L ${r - k * 2} ${top}`,
    `C ${r - k} ${top}, ${r} ${MID - 8}, ${r} ${MID}`,
    `C ${r} ${MID + 8}, ${r - k} ${bottom}, ${r - k * 2} ${bottom}`,
    `L ${l + k * 2} ${bottom}`,
    `C ${l + k} ${bottom}, ${l} ${MID + 8}, ${l} ${MID}`,
    "Z",
  ].join(" ");
}

export function petalPath(cx: number, r: number) {
  return `M ${cx} ${MID} C ${cx - r * 0.45} ${MID - r * 0.5}, ${cx - r * 0.32} ${MID - r}, ${cx} ${MID - r} C ${cx + r * 0.32} ${MID - r}, ${cx + r * 0.45} ${MID - r * 0.5}, ${cx} ${MID} Z`;
}
