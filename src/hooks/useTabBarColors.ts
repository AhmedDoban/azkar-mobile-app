import useDirection from "./useDirection";
import useThemeColors from "./useThemeColors";

/**
 * Colors and font of the bottom tab bar. Shared with controls that imitate it
 * (e.g. the theme picker) so they stay identical.
 */
export default function useTabBarColors() {
  const colors = useThemeColors();
  const { isRTL } = useDirection();

  return {
    font: isRTL ? "LamaSans" : "SpaceGrotesk",
    /** Selected icon + label (white in dark mode, brand teal in light) */
    active: colors.isDark ? "#ffffff" : colors.main,
    inactive: colors.gray,
  };
}
