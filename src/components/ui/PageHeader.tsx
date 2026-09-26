import { ReactNode } from "react";
import { View } from "react-native";
import AppText from "./AppText";

/**
 * Large page title for the tab screens. Rendered by React Native instead of the
 * native navigation bar, which breaks Arabic letter shaping in large titles.
 */
export default function PageHeader({
  title,
  trailing,
}: {
  title: string;
  trailing?: ReactNode;
}) {
  return (
    <View className="flex-row items-center justify-between gap-3 px-1">
      <AppText
        weight="bold"
        className="flex-1 text-3xl leading-[44px]"
        numberOfLines={1}
      >
        {title}
      </AppText>
      {trailing}
    </View>
  );
}
