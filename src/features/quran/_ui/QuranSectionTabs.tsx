import AppText from "@/components/ui/AppText";
import PressableScale from "@/components/ui/PressableScale";
import { View } from "react-native";

export type QuranSection = "surahs" | "khatma" | "saved";

export default function QuranSectionTabs({
  value,
  onChange,
  labels,
}: {
  value: QuranSection;
  onChange: (value: QuranSection) => void;
  labels: Record<QuranSection, string>;
}) {
  return (
    <View className="flex-row gap-1 rounded-full border border-line bg-surface p-1">
      {(["surahs", "khatma", "saved"] as const).map((key) => {
        const selected = value === key;
        return (
          <PressableScale
            key={key}
            scaleTo={0.97}
            onPress={() => onChange(key)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            className={
              selected
                ? "flex-1 items-center rounded-full bg-main-fill py-2.5"
                : "flex-1 items-center rounded-full py-2.5"
            }
          >
            <AppText
              weight="bold"
              className={selected ? "text-on-fill" : "text-main-gray"}
            >
              {labels[key]}
            </AppText>
          </PressableScale>
        );
      })}
    </View>
  );
}
