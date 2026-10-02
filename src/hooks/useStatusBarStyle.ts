import { StatusBarOverride } from "@/components/StatusBarContext";
import { useFocusEffect } from "expo-router";
import { StatusBarStyle } from "expo-status-bar";
import { useCallback, useContext } from "react";

export default function useStatusBarStyle(style: StatusBarStyle | null) {
  const setOverride = useContext(StatusBarOverride);
  useFocusEffect(
    useCallback(() => {
      setOverride(style);
      return () => setOverride(null);
    }, [setOverride, style]),
  );
}
