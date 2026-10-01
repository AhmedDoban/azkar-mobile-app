import useThemeColors from "@/hooks/useThemeColors";

const DARK = {
  card: "#161616",
  border: "#262626",
  title: "#929292",
  subtitle: "#929292",
  track: "#2a2a2a",
  danger: "#e57373",
  activeFill: "#222222",
};

export default function useSettingsColors() {
  const colors = useThemeColors();
  if (colors.isDark) {
    return { isDark: true as const, ...DARK, switchOn: colors.brand.mid };
  }
  return {
    isDark: false as const,
    card: colors.surface,
    border: colors.line,
    title: colors.gray,
    subtitle: colors.gray,
    track: colors.surfaceMuted,
    switchOn: colors.main,
    danger: colors.orange,
    activeFill: colors.brand.soft,
  };
}
