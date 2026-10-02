import useThemeColors from "@/hooks/useThemeColors";

const LIGHT = {
  page: "#ffffff",
  ink: "#1f1a14",
  gold: "#a3875a",
  frame: "#d8c7a3",
  frameFill: "#f4f4f4",
};

const DARK = {
  page: "#0f0d0a",
  ink: "#efe7d6",
  gold: "#c9a96e",
  frame: "#5a4a30",
  frameFill: "#1d1912",
};

export default function useMushafColors() {
  const { isDark, brand } = useThemeColors();
  const accent = isDark ? brand.bright : brand.main;
  return {
    ...(isDark ? DARK : LIGHT),
    accent,
    highlight: `${accent.slice(0, 7)}${isDark ? "40" : "29"}`,
  };
}
