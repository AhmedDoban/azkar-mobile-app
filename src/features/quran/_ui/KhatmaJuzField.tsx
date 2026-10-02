import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import { View } from "react-native";

export default function KhatmaJuzField({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {
  const colors = useThemeColors();
  return (
    <PressableScale
      scaleTo={0.97}
      onPress={onPress}
      className="flex-1 flex-row items-center justify-between rounded-2xl border border-line px-4 py-3"
    >
      <View className="gap-0.5">
        <AppText className="text-xs text-main-gray">{label}</AppText>
        <AppText weight="bold" className="text-lg text-main">
          {value}
        </AppText>
      </View>
      <Icon name="chevronDown" size={18} tintColor={colors.main} />
    </PressableScale>
  );
}
