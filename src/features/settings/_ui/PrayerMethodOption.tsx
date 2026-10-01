import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import { View } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";

const METHOD_CARD_HEIGHT = 60;

export default function PrayerMethodOption({
  label,
  hint,
  selected,
  onPress,
}: {
  label: string;
  hint?: string;
  selected: boolean;
  onPress: () => void;
}) {
  const colors = useThemeColors();
  const palette = useSettingsColors();

  return (
    <PressableScale
      scaleTo={0.98}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      className="flex-row items-center gap-3 rounded-2xl border px-4"
      style={{
        height: METHOD_CARD_HEIGHT,
        borderColor: selected ? colors.accent : palette.border,
        backgroundColor: selected ? palette.activeFill : palette.card,
      }}
    >
      <View className="flex-1 justify-center gap-0.5">
        <AppText weight="bold" className="text-[15px]" numberOfLines={1}>
          {label}
        </AppText>
        {hint ? (
          <AppText
            className="text-xs"
            style={{ color: palette.subtitle }}
            numberOfLines={1}
          >
            {hint}
          </AppText>
        ) : null}
      </View>
      {selected ? (
        <View
          className="size-6 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.accent }}
        >
          <Icon
            name="check"
            size={14}
            strokeWidth={3}
            tintColor={colors.isDark ? "#0a0a0a" : "#ffffff"}
          />
        </View>
      ) : (
        <View
          className="size-6 rounded-full"
          style={{ borderWidth: 2, borderColor: palette.border }}
        />
      )}
    </PressableScale>
  );
}
