import { StatusBarStyle } from "expo-status-bar";
import { createContext } from "react";

export const StatusBarOverride = createContext<
  (style: StatusBarStyle | null) => void
>(() => {});
