import AppText from "@/components/ui/AppText";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";
import SettingsCard from "./SettingsCard";

export default function SettingsGroup({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
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
      <SettingsCard className="overflow-hidden">{children}</SettingsCard>
    </View>
  );
}
