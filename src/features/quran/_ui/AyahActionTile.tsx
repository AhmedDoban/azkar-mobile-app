import AppText from "@/components/ui/AppText";
import Icon, { IconKey } from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import usePopupColors from "../_components/usePopupColors";

export default function AyahActionTile({
  icon,
  label,
  onPress,
  chevron,
}: {
  icon: IconKey;
  label?: string;
  onPress: () => void;
  chevron?: boolean;
}) {
  const c = usePopupColors();
  return (
    <PressableScale
      scaleTo={0.97}
      onPress={onPress}
      className="flex-1 flex-row items-center gap-3 rounded-2xl px-4 py-4"
      style={{ backgroundColor: c.page }}
    >
      <Icon name={icon} size={24} tintColor={c.accent} />
      {label ? (
        <AppText weight="bold" className="flex-1" style={{ color: c.accent }}>
          {label}
        </AppText>
      ) : null}
      {chevron ? (
        <Icon name="chevronLeft" size={18} tintColor={c.gold} />
      ) : null}
    </PressableScale>
  );
}
