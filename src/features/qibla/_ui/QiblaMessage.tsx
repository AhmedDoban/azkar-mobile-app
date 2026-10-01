import AppText from "@/components/ui/AppText";
import Icon, { IconKey } from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import { View } from "react-native";

export default function QiblaMessage({
  icon,
  title,
  hint,
  action,
  onAction,
}: {
  icon: IconKey;
  title: string;
  hint: string;
  action: string;
  onAction: () => void;
}) {
  const colors = useThemeColors();

  return (
    <View className="items-center gap-3 px-6 py-16">
      <View className="size-16 items-center justify-center rounded-full bg-main-soft">
        <Icon name={icon} size={28} tintColor={colors.main} />
      </View>
      <AppText
        weight="bold"
        className="text-lg"
        style={{ textAlign: "center" }}
      >
        {title}
      </AppText>
      <AppText className="text-main-gray" style={{ textAlign: "center" }}>
        {hint}
      </AppText>
      <PressableScale
        onPress={onAction}
        className="mt-2 rounded-full bg-main-fill px-6 py-3"
      >
        <AppText weight="bold" className="text-on-fill">
          {action}
        </AppText>
      </PressableScale>
    </View>
  );
}
