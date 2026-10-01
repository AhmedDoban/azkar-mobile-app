import useThemeColors from "@/hooks/useThemeColors";

const LIGHT = {
  paper: "#f3f8f6",
  card: "#ffffff",
  ink: "#092b38",
  muted: "#667176",
  accent: "#18766f",
  line: "#dde8e4",
  chip: "#eef4f1",
  onAccent: "#ffffff",
};

const DARK = {
  paper: "#0e1412",
  card: "#101010",
  ink: "#f0f0f0",
  muted: "#929292",
  accent: "#4fbf98",
  line: "#232a27",
  chip: "#1a201e",
  onAccent: "#0a0a0a",
};

export default function useHadithColors() {
  const { isDark, brand } = useThemeColors();
  if (isDark) return { ...DARK, accent: brand.bright };
  return {
    ...LIGHT,
    accent: brand.main,
    paper: brand.tint,
    line: brand.line,
    chip: brand.soft,
  };
}
