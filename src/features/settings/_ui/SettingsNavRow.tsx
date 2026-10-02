import AppText from "@/components/ui/AppText";
import Icon, { IconKey } from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useDirection from "@/hooks/useDirection";
import useSettingsColors from "../_components/useSettingsColors";
import SettingsIconBadge from "./SettingsIconBadge";

export default function SettingsNavRow({
  icon,
  title,
  value,
  onPress,
}: {
  icon: IconKey;
  title: string;
  value?: string | null;
  onPress: () => void;
}) {
  const palette = useSettingsColors();
  const { isRTL } = useDirection();

  return (
    <PressableScale
      scaleTo={0.98}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      className="flex-row items-center gap-3 py-3"
    >
      <SettingsIconBadge icon={icon} size={17} />
      <AppText weight="bold" className="flex-1 text-[15px]">
        {title}
      </AppText>
      {value ? (
        <AppText
          className="max-w-[45%] text-sm"
          style={{ color: palette.subtitle }}
          numberOfLines={1}
        >
          {value}
        </AppText>
      ) : null}
      <Icon
        name={isRTL ? "chevronLeft" : "chevronRight"}
        size={16}
        tintColor={palette.subtitle}
      />
    </PressableScale>
  );
}
