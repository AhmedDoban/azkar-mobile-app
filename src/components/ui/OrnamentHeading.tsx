import { View } from "react-native";
import AppText from "./AppText";
import Ornament from "./Ornament";

/** Centered section heading between two ornaments, like the verse band */
export default function OrnamentHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View className="items-center gap-1">
      <View className="w-full flex-row items-center gap-3">
        <Ornament />
        <AppText weight="bold" className="text-lg text-main">
          {title}
        </AppText>
        <Ornament flip />
      </View>
      {subtitle ? (
        <AppText
          className="text-xs text-main-gray"
          style={{ textAlign: "center" }}
        >
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
}
