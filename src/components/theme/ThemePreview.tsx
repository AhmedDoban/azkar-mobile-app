import { Colors } from "@/constants/Colors";
import { View } from "react-native";

export default function ThemePreview({ scheme }: { scheme: "light" | "dark" }) {
  const c = Colors[scheme];
  const dark = scheme === "dark";

  return (
    <View className="flex-1 gap-1.5 p-2" style={{ backgroundColor: c.bg }}>
      <View
        className="h-7 justify-end rounded-lg p-1.5"
        style={{ backgroundColor: dark ? "#0f2a22" : c.main }}
      >
        <View
          className="h-1.5 w-8 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
        />
      </View>
      <View
        className="gap-1 rounded-lg p-1.5"
        style={{ backgroundColor: c.surface }}
      >
        <View
          className="h-1.5 w-10 rounded-full"
          style={{ backgroundColor: c.ink, opacity: 0.8 }}
        />
        <View
          className="h-1 w-7 rounded-full"
          style={{ backgroundColor: c.gray, opacity: 0.6 }}
        />
      </View>
      <View className="flex-row gap-1.5">
        <View
          className="h-5 flex-1 rounded-md"
          style={{ backgroundColor: dark ? c.surfaceMuted : c.mainSoft }}
        />
        <View
          className="h-5 flex-1 rounded-md"
          style={{ backgroundColor: dark ? c.surfaceMuted : c.mainSoft }}
        />
      </View>
    </View>
  );
}
