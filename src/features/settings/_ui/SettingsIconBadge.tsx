import Icon, { IconKey } from "@/components/ui/Icon";
import useThemeColors from "@/hooks/useThemeColors";
import { View } from "react-native";

export default function SettingsIconBadge({
  icon,
  size,
}: {
  icon: IconKey;
  size: number;
}) {
  const colors = useThemeColors();

  return (
    <View className="size-9 items-center justify-center rounded-full bg-accent-soft">
      <Icon name={icon} size={size} tintColor={colors.accent} />
    </View>
  );
}
