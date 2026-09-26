import { View } from "react-native";
import AppText from "./AppText";

export default function SectionTitle({
  title,
  trailing,
}: {
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <View className="flex-row items-center justify-between px-1">
      <AppText weight="bold" className="text-lg">
        {title}
      </AppText>
      {trailing}
    </View>
  );
}
