import useThemeColors from "@/hooks/useThemeColors";

const LIGHT = {
  bg: "#f7f6f0",
  main: "#18766f",
  gold: "#c9a96e",
  text: "#092b38",
  muted: "#667176",
};

const DARK = {
  bg: "#050505",
  main: "#2f8f72",
  gold: "#d8b878",
  text: "#f0f0f0",
  muted: "#929292",
};

export default function useSplashPalette() {
  return useThemeColors().isDark ? DARK : LIGHT;
}
