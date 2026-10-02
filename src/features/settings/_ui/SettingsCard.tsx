import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";

export default function SettingsCard({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const palette = useSettingsColors();

  return (
    <View
      className={cn("gap-3 rounded-3xl border p-4", className)}
      style={{ backgroundColor: palette.card, borderColor: palette.border }}
    >
      {children}
    </View>
  );
}
