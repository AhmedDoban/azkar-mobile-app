import { Colors, ThemeColors } from "@/constants/Colors";
import { useAppSelector } from "@/store/Store";
import { VariableContextProvider } from "nativewind";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Appearance, Platform, useColorScheme } from "react-native";

type Theme = ThemeColors & { isDark: boolean };

const ThemeContext = createContext<Theme>({ ...Colors.light, isDark: false });

// CSS variable names used by the @theme tokens in global.css
const toCssVariables = (c: ThemeColors) => ({
  "--main-color": c.main,
  "--main-fill-color": c.mainFill,
  "--on-fill-color": c.onFill,
  "--hero-color": c.hero,
  "--on-hero-color": c.onHero,
  "--on-hero-muted-color": c.onHeroMuted,
  "--hero-blob-color": c.heroBlob,
  "--hero-border-color": c.heroBorder,
  "--main-bg-color": c.bg,
  "--main-gray-color": c.gray,
  "--main-orange-color": c.orange,
  "--main-yellow-color": c.yellow,
  "--main-surface-color": c.surface,
  "--main-surface-muted-color": c.surfaceMuted,
  "--main-line-color": c.line,
  "--main-p-color": c.ink,
  "--main-error-color": c.error,
  "--main-soft-color": c.mainSoft,
  "--main-border-color": c.mainBorder,
  "--main-orange-soft-color": c.orangeSoft,
});

/**
 * Resolves the saved theme (system / light / dark) and feeds the palette to both
 * className styles (CSS variables) and native props (useThemeColors).
 */
export default function ThemeProvider({ children }: PropsWithChildren) {
  const preference = useAppSelector((state) => state.settings.theme);
  const system = useColorScheme();
  const isDark =
    preference === "system" ? system === "dark" : preference === "dark";

  // Native chrome (tab bar, headers, keyboard, alerts) follows the same choice
  useEffect(() => {
    if (Platform.OS === "web") return;
    Appearance.setColorScheme(
      preference === "system" ? "unspecified" : preference,
    );
  }, [preference]);

  const theme = useMemo(
    () => ({ ...(isDark ? Colors.dark : Colors.light), isDark }),
    [isDark],
  );
  const variables = useMemo(() => toCssVariables(theme), [theme]);

  return (
    <ThemeContext value={theme}>
      <VariableContextProvider value={variables}>
        {children}
      </VariableContextProvider>
    </ThemeContext>
  );
}

export const useTheme = () => useContext(ThemeContext);

export function ThemeScope({ children }: PropsWithChildren) {
  const theme = useTheme();
  const variables = useMemo(() => toCssVariables(theme), [theme]);
  return (
    <VariableContextProvider value={variables}>
      {children}
    </VariableContextProvider>
  );
}
