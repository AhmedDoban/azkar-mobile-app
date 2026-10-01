import AppText from "@/components/ui/AppText";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";

export default function SettingsGroup({
  title,
  children,
  plain = false,
}: PropsWithChildren<{ title: string; plain?: boolean }>) {
  const palette = useSettingsColors();

  return (
    <View className="gap-3">
      <AppText
        weight="bold"
        className="px-1 text-sm uppercase"
        style={{ color: palette.title }}
      >
        {title}
      </AppText>
      {plain ? (
        <View className="gap-3">{children}</View>
      ) : (
        <View
          className="gap-3 overflow-hidden rounded-3xl border p-4"
          style={{ backgroundColor: palette.card, borderColor: palette.border }}
        >
          {children}
        </View>
      )}
    </View>
  );
}
