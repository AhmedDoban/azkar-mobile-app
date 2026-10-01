import useThemeColors from "@/hooks/useThemeColors";
import { useFocusEffect } from "expo-router";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

const SetOverride = createContext<(style: StatusBarStyle | null) => void>(
  () => {},
);

export function StatusBarProvider({ children }: PropsWithChildren) {
  const colors = useThemeColors();
  const [override, setOverride] = useState<StatusBarStyle | null>(null);

  return (
    <SetOverride.Provider value={setOverride}>
      <StatusBar
        style={override ?? (colors.isDark ? "light" : "dark")}
        hidden={false}
      />
      {children}
    </SetOverride.Provider>
  );
}

export function useStatusBarStyle(style: StatusBarStyle | null) {
  const setOverride = useContext(SetOverride);
  useFocusEffect(
    useCallback(() => {
      setOverride(style);
      return () => setOverride(null);
    }, [setOverride, style]),
  );
}
