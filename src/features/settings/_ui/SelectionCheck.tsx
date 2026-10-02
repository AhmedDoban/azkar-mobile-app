import Icon from "@/components/ui/Icon";
import useThemeColors from "@/hooks/useThemeColors";
import { View } from "react-native";

export default function SelectionCheck({
  selected,
  idleColor,
}: {
  selected: boolean;
  idleColor: string;
}) {
  const colors = useThemeColors();

  return (
    <View
      className="size-6 items-center justify-center rounded-full"
      style={
        selected
          ? { backgroundColor: colors.accent }
          : { borderWidth: 2, borderColor: idleColor }
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
  );
}
