import AppText from "@/components/ui/AppText";
import PressableScale from "@/components/ui/PressableScale";
import { View } from "react-native";

export default function KhatmaChoice<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <View className="flex-row gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <PressableScale
            key={option.value}
            scaleTo={0.97}
            onPress={() => onChange(option.value)}
            accessibilityState={{ selected }}
            className={
              selected
                ? "flex-1 items-center rounded-2xl border border-main bg-main-soft py-3"
                : "flex-1 items-center rounded-2xl border border-line py-3"
            }
          >
            <AppText
              weight="bold"
              className={selected ? "text-main" : "text-main-gray"}
            >
              {option.label}
            </AppText>
          </PressableScale>
        );
      })}
    </View>
  );
}
