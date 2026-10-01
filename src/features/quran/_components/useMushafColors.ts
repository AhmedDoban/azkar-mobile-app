import useThemeColors from "@/hooks/useThemeColors";

const LIGHT = {
  page: "#fbf8ef",
  ink: "#1f1a14",
  gold: "#a3875a",
  frame: "#d8c7a3",
  frameFill: "#f1e8d4",
};

const DARK = {
  page: "#0f0d0a",
  ink: "#efe7d6",
  gold: "#c9a96e",
  frame: "#5a4a30",
  frameFill: "#1d1912",
};

export default function useMushafColors() {
  return useThemeColors().isDark ? DARK : LIGHT;
}
