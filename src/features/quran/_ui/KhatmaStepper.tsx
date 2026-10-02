import AppText from "@/components/ui/AppText";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import * as Haptics from "expo-haptics";
import { View } from "react-native";

export default function KhatmaStepper({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
}) {
  const colors = useThemeColors();
  const change = (delta: number) => {
    const next = Math.min(max, Math.max(min, value + delta));
    if (next !== value) {
      Haptics.selectionAsync();
      onChange(next);
    }
  };
  return (
    <View className="flex-row items-center justify-between gap-3">
      <AppText className="flex-1 text-main-gray">{label}</AppText>
      <View className="flex-row items-center gap-3">
        <PressableScale
          onPress={() => change(-step)}
          onLongPress={() => change(-step * 10)}
          className="size-9 items-center justify-center rounded-full bg-main-soft"
        >
          <AppText weight="bold" className="text-lg text-main">
            −
          </AppText>
        </PressableScale>
        <AppText
          weight="bold"
          className="min-w-12 text-center text-lg"
          style={{ color: colors.ink }}
        >
          {format(value)}
        </AppText>
        <PressableScale
          onPress={() => change(step)}
          onLongPress={() => change(step * 10)}
          className="size-9 items-center justify-center rounded-full bg-main-soft"
        >
          <AppText weight="bold" className="text-lg text-main">
            +
          </AppText>
        </PressableScale>
      </View>
    </View>
  );
}
