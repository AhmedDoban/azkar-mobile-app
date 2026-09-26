import { View } from "react-native";
import useThemeColors from "@/hooks/useThemeColors";
import AppText from "./AppText";
import Icon, { IconKey } from "./Icon";

export default function EmptyState({
  icon,
  title,
  hint,
}: {
  icon: IconKey;
  title: string;
  hint?: string;
}) {
  const colors = useThemeColors();

  return (
    <View className="items-center gap-3 px-8 py-16">
      <View className="size-16 items-center justify-center rounded-full bg-surface-muted">
        <Icon name={icon} size={28} tintColor={colors.main} />
      </View>
      <AppText
        weight="bold"
        className="text-lg"
        style={{ textAlign: "center" }}
      >
        {title}
      </AppText>
      {hint ? (
        <AppText className="text-main-gray" style={{ textAlign: "center" }}>
          {hint}
        </AppText>
      ) : null}
    </View>
  );
}
