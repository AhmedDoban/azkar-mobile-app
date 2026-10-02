import { PropsWithChildren } from "react";
import { View } from "react-native";
import SettingsCard from "./SettingsCard";
import SettingsGroupTitle from "./SettingsGroupTitle";

export default function SettingsGroup({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <View className="gap-3">
      <SettingsGroupTitle title={title} />
      <SettingsCard className="overflow-hidden">{children}</SettingsCard>
    </View>
  );
}
