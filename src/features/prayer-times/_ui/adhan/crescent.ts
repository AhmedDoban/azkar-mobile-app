export function crescentPath(cx: number, cy: number, r: number) {
  const inner = r * 1.3;
  return (
    `M ${cx} ${cy - r} ` +
    `A ${r} ${r} 0 1 0 ${cx} ${cy + r} ` +
    `A ${inner} ${inner} 0 0 1 ${cx} ${cy - r} Z`
  );
}

export function cloudBandPath(
  y: number,
  bottom: number,
  bumps: [width: number, rise: number][],
  startX = -30,
) {
  let x = startX;
  let d = `M ${x} ${bottom} L ${x} ${y}`;
  for (const [w, rise] of bumps) {
    d += ` Q ${x + w / 2} ${y - rise * 1.9} ${x + w} ${y}`;
    x += w;
  }
  return `${d} L ${x} ${bottom} Z`;
}
