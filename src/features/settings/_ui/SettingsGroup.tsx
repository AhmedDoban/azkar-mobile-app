import AppText from "@/components/ui/AppText";
import { PropsWithChildren } from "react";
import { View } from "react-native";

export default function SettingsGroup({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <View className="gap-3">
      <AppText weight="bold" className="px-1 text-sm uppercase text-main-gray">
        {title}
      </AppText>
      <View className="gap-3 overflow-hidden rounded-3xl border border-line bg-surface p-4">
        {children}
      </View>
    </View>
  );
}
