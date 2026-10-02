import useSettingsColors from "@/features/settings/_components/useSettingsColors";
import useThemeColors from "@/hooks/useThemeColors";

export default function usePopupColors() {
  const colors = useThemeColors();
  const palette = useSettingsColors();
  const accent = colors.isDark ? colors.brand.bright : colors.main;
  return {
    ink: colors.ink,
    accent,
    page: palette.track,
    frame: palette.border,
    frameFill: palette.card,
    gold: palette.subtitle,
    highlight: `${accent.slice(0, 7)}29`,
  };
}
