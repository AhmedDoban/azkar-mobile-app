const fmt = (n: number) => Math.round(n * 10) / 10;

export default function rosette(radii: number[]) {
  let d = "";
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const at = (x: number, y: number) =>
      `${fmt(x * cos - y * sin)} ${fmt(x * sin + y * cos)}`;
    for (const r of radii) {
      d +=
        `M ${at(0, 0)} C ${at(-r * 0.45, -r * 0.5)}, ${at(-r * 0.32, -r)}, ${at(0, -r)} ` +
        `C ${at(r * 0.32, -r)}, ${at(r * 0.45, -r * 0.5)}, ${at(0, 0)} Z `;
    }
  }
  return d;
}
