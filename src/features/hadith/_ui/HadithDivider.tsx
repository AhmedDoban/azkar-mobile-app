import { View } from "react-native";
import useHadithColors from "../_components/useHadithColors";

export default function HadithDivider() {
  const { accent, line } = useHadithColors();

  return (
    <View className="flex-row items-center gap-2 self-stretch px-6">
      <View className="h-px flex-1" style={{ backgroundColor: line }} />
      <View
        className="size-1.5 rotate-45"
        style={{ backgroundColor: accent }}
      />
      <View
        className="size-2.5 rotate-45 border"
        style={{ borderColor: accent }}
      />
      <View
        className="size-1.5 rotate-45"
        style={{ backgroundColor: accent }}
      />
      <View className="h-px flex-1" style={{ backgroundColor: line }} />
    </View>
  );
}
