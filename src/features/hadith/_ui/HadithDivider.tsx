import { View } from "react-native";

export default function HadithDivider({
  accent,
  line,
}: {
  accent: string;
  line: string;
}) {
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
