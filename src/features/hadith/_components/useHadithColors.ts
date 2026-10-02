import useThemeColors from "@/hooks/useThemeColors";
import { useMemo } from "react";

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
  return useMemo(
    () =>
      isDark
        ? { ...DARK, accent: brand.bright }
        : {
            ...LIGHT,
            accent: brand.main,
            paper: brand.tint,
            line: brand.line,
            chip: brand.soft,
          },
    [isDark, brand],
  );
}
