import { Colors, ThemeColors } from "@/constants/Colors";
import toCssVariables from "./cssVariables";
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

export default function ThemeProvider({ children }: PropsWithChildren) {
  const preference = useAppSelector((state) => state.settings.theme);
  const system = useColorScheme();
  const isDark =
    preference === "system" ? system === "dark" : preference === "dark";

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
