import IconButton from "@/components/Buttons/IconButton";
import useThemeColors from "@/hooks/useThemeColors";
import { View } from "react-native";

export default function CategoryHeaderActions({
  isFavorite,
  canReset,
  resetLabel,
  favoriteLabel,
  onReset,
  onToggleFavorite,
}: {
  isFavorite: boolean;
  canReset: boolean;
  resetLabel: string;
  favoriteLabel: string;
  onReset: () => void;
  onToggleFavorite: () => void;
}) {
  const colors = useThemeColors();
  const background = {
    backgroundColor: colors.isDark ? "#1f1f1f" : colors.surfaceMuted,
  };
  const iconColor = colors.isDark ? "#ffffff" : colors.main;

  return (
    <View className="flex-row gap-2">
      <IconButton
        icon="reset"
        color={iconColor}
        className="size-9"
        style={[background, { opacity: canReset ? 1 : 0.4 }]}
        accessibilityLabel={resetLabel}
        disabled={!canReset}
        onPress={onReset}
      />
      <IconButton
        icon={isFavorite ? "heartFill" : "heart"}
        color={isFavorite ? colors.love : iconColor}
        className="size-9"
        style={background}
        accessibilityLabel={favoriteLabel}
        accessibilityState={{ selected: isFavorite }}
        onPress={onToggleFavorite}
      />
    </View>
  );
}
