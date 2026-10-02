import { Colors } from "@/constants/Colors";
import { brandFor } from "@/constants/palettes";
import toCssVariables from "./cssVariables";
import { ThemeContext } from "./ThemeContext";
import { useAppSelector } from "@/store/Store";
import { VariableContextProvider } from "nativewind";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { Appearance, Platform, useColorScheme } from "react-native";

export default function ThemeProvider({ children }: PropsWithChildren) {
  const preference = useAppSelector((state) => state.settings.theme);
  const palette = useAppSelector((state) => state.settings.palette);
  const system = useColorScheme();
  const isDark =
    preference === "system" ? system === "dark" : preference === "dark";

  useEffect(() => {
    if (Platform.OS === "web") return;
    Appearance.setColorScheme(
      preference === "system" ? "unspecified" : preference,
    );
  }, [preference]);

  const theme = useMemo(() => {
    const brand = brandFor(palette);
    const base = isDark ? Colors.dark : Colors.light;
    const tinted = isDark
      ? {
          main: brand.bright,
          mainFill: brand.bright,
          hero: brand.night,
          heroBorder: brand.deep,
          accent: brand.bright,
          accentSoft: `${brand.bright}24`,
          mainSoft: `${brand.bright}1f`,
        }
      : {
          main: brand.main,
          mainFill: brand.main,
          hero: brand.main,
          heroBorder: brand.main,
          accent: brand.main,
          accentSoft: `${brand.main}1f`,
          mainSoft: `${brand.main}1f`,
        };
    return { ...base, ...tinted, isDark, brand };
  }, [isDark, palette]);
  const variables = useMemo(() => toCssVariables(theme), [theme]);

  return (
    <ThemeContext value={theme}>
      <VariableContextProvider value={variables}>
        {children}
      </VariableContextProvider>
    </ThemeContext>
  );
}
