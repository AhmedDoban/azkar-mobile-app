export const PALETTE_IDS = [
  "emerald",
  "teal",
  "ocean",
  "indigo",
  "violet",
  "rose",
  "ruby",
  "amber",
  "olive",
  "slate",
] as const;

export type PaletteId = (typeof PALETTE_IDS)[number];

export const DEFAULT_PALETTE: PaletteId = "emerald";

const BASE: Record<PaletteId, { main: string; bright: string }> = {
  emerald: { main: "#18766f", bright: "#4fbf98" },
  teal: { main: "#0f7c8a", bright: "#4cc3d1" },
  ocean: { main: "#1f5fa8", bright: "#6aa8ee" },
  indigo: { main: "#4a4fb5", bright: "#8f93ec" },
  violet: { main: "#7a4ab0", bright: "#b58ae6" },
  rose: { main: "#b23a6b", bright: "#ec86ad" },
  ruby: { main: "#b33a3a", bright: "#ec8a80" },
  amber: { main: "#a8650a", bright: "#e6a85a" },
  olive: { main: "#5f7a2a", bright: "#a6c46a" },
  slate: { main: "#475569", bright: "#a3b2c7" },
};

const channels = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const toHex = (rgb: number[]) =>
  `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

const mix = (hex: string, target: string, amount: number) => {
  const a = channels(hex);
  const b = channels(target);
  return toHex(a.map((v, i) => v + (b[i] - v) * amount));
};

export type Brand = {
  main: string;
  bright: string;
  mid: string;
  deep: string;
  night: string;
  soft: string;
  tint: string;
  line: string;
};

export function brandFor(id: PaletteId): Brand {
  const { main, bright } = BASE[id] ?? BASE[DEFAULT_PALETTE];
  return {
    main,
    bright,
    mid: mix(main, "#000000", 0.18),
    deep: mix(main, "#000000", 0.55),
    night: mix(main, "#000000", 0.82),
    soft: mix(main, "#ffffff", 0.88),
    tint: mix(main, "#ffffff", 0.95),
    line: mix(main, "#ffffff", 0.82),
  };
}

export const isPaletteId = (value: unknown): value is PaletteId =>
  PALETTE_IDS.includes(value as PaletteId);
