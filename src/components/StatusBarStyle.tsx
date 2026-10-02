import useThemeColors from "@/hooks/useThemeColors";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { PropsWithChildren, useState } from "react";
import { StatusBarOverride } from "./StatusBarContext";

export function StatusBarProvider({ children }: PropsWithChildren) {
  const colors = useThemeColors();
  const [override, setOverride] = useState<StatusBarStyle | null>(null);

  return (
    <StatusBarOverride.Provider value={setOverride}>
      <StatusBar
        style={override ?? (colors.isDark ? "light" : "dark")}
        hidden={false}
      />
      {children}
    </StatusBarOverride.Provider>
  );
}
