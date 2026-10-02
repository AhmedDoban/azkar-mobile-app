import { View } from "react-native";
import AppText from "@/components/ui/AppText";
import useThemeColors from "@/hooks/useThemeColors";
import { gradeLevel } from "../_data/gradeLevel";

export default function GradeBadge({
  label,
  grade,
}: {
  label: string;
  grade: string;
}) {
  const colors = useThemeColors();
  const level = gradeLevel(grade);
  const color = level ? colors[level] : colors.ink;
  const background = level ? colors[`${level}Soft`] : colors.surfaceMuted;

  return (
    <View
      className="flex-row items-center gap-2 self-start rounded-2xl px-3 py-2"
      style={{ backgroundColor: background }}
      accessibilityLabel={`${label}: ${grade}`}
    >
      <View
        className="size-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <AppText className="text-xs text-main-gray">{label}:</AppText>
      <AppText weight="bold" className="shrink text-sm" style={{ color }}>
        {grade}
      </AppText>
    </View>
  );
}
