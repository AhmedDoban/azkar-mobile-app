import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import useSettingsColors from "../_components/useSettingsColors";

export default function LanguageCard({
  flag,
  label,
  hint,
  arabic,
  selected,
  onPress,
}: {
  flag: string;
  label: string;
  hint: string;
  arabic: boolean;
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
      className="flex-row items-center gap-3 rounded-2xl p-3.5"
      style={{
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? colors.accent : palette.border,
        backgroundColor: selected ? colors.accentSoft : palette.card,
      }}
    >
      <View
        className="size-11 overflow-hidden rounded-full"
        style={{ borderWidth: 1, borderColor: palette.border }}
      >
        <SvgXml xml={flag} width="100%" height="100%" />
      </View>

      <View className="flex-1">
        <AppText weight="bold" arabic={arabic} className="text-base">
          {label}
        </AppText>
        <AppText className="text-xs" style={{ color: palette.subtitle }}>
          {hint}
        </AppText>
      </View>

      <View
        className="size-6 items-center justify-center rounded-full"
        style={
          selected
            ? { backgroundColor: colors.accent }
            : { borderWidth: 2, borderColor: palette.subtitle }
        }
      >
        {selected ? (
          <Icon
            name="check"
            size={14}
            strokeWidth={3}
            tintColor={colors.isDark ? "#0a0a0a" : "#ffffff"}
          />
        ) : null}
      </View>
    </PressableScale>
  );
}
