import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";

export default function SelectableCard({
  label,
  selected,
  onPress,
  className = "flex-row items-center gap-3 rounded-2xl p-3.5",
  style,
  children,
}: PropsWithChildren<{
  label: string;
  selected: boolean;
  onPress: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}>) {
  const colors = useThemeColors();
  const palette = useSettingsColors();

  return (
    <PressableScale
      scaleTo={0.98}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      className={className}
      style={[
        {
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? colors.accent : palette.border,
          backgroundColor: selected ? palette.activeFill : palette.card,
        },
        style,
      ]}
    >
      {children}
    </PressableScale>
  );
}
