import AppText from "@/components/ui/AppText";
import Icon, { IconKey } from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import { View } from "react-native";
import ThemePreview from "./ThemePreview";

export default function ThemeOption({
  label,
  icon,
  preview,
  selected,
  onPress,
}: {
  label: string;
  icon: IconKey;
  preview: "light" | "dark" | "system";
  selected: boolean;
  onPress: () => void;
}) {
  const colors = useThemeColors();
  const edge = selected
    ? colors.accent
    : colors.isDark
      ? "#2e2e2e"
      : colors.line;

  return (
    <PressableScale
      scaleTo={0.95}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      className="flex-1 gap-2"
    >
      <View
        className="overflow-hidden rounded-2xl"
        style={{ height: 96, borderWidth: selected ? 2 : 1, borderColor: edge }}
      >
        {preview === "system" ? (
          <View className="flex-1 flex-row" style={{ direction: "ltr" }}>
            <View className="flex-1 overflow-hidden">
              <View style={{ width: "200%", height: "100%" }}>
                <ThemePreview scheme="light" />
              </View>
            </View>
            <View className="flex-1 overflow-hidden">
              <View
                style={{ width: "200%", height: "100%", marginLeft: "-100%" }}
              >
                <ThemePreview scheme="dark" />
              </View>
            </View>
          </View>
        ) : (
          <ThemePreview scheme={preview} />
        )}

        {selected ? (
          <View
            className="absolute end-1.5 top-1.5 size-5 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.accent }}
          >
            <Icon
              name="check"
              size={11}
              tintColor={colors.isDark ? "#0a0a0a" : "#ffffff"}
            />
          </View>
        ) : null}
      </View>

      <View className="flex-row items-center justify-center gap-1.5">
        <Icon
          name={icon}
          size={14}
          tintColor={selected ? colors.accent : colors.gray}
        />
        <AppText
          weight={selected ? "bold" : "regular"}
          className="text-sm"
          style={{ color: selected ? colors.ink : colors.gray }}
        >
          {label}
        </AppText>
      </View>
    </PressableScale>
  );
}
