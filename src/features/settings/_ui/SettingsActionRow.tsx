import AppText from "@/components/ui/AppText";
import Icon, { IconKey } from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import useSettingsColors from "../_components/useSettingsColors";

export default function SettingsActionRow({
  icon,
  label,
  danger = false,
  onPress,
}: {
  icon: IconKey;
  label: string;
  danger?: boolean;
  onPress: () => void;
}) {
  const colors = useThemeColors();
  const palette = useSettingsColors();
  const color = danger ? palette.danger : colors.ink;

  return (
    <PressableScale
      scaleTo={0.98}
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center gap-3 rounded-2xl border px-4 py-4"
      style={{ backgroundColor: palette.card, borderColor: palette.border }}
    >
      <Icon
        name={icon}
        size={20}
        tintColor={danger ? palette.danger : colors.accent}
      />
      <AppText weight="bold" style={{ color }}>
        {label}
      </AppText>
    </PressableScale>
  );
}
