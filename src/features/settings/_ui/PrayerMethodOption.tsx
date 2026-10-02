import AppText from "@/components/ui/AppText";
import { View } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";
import SelectableCard from "./SelectableCard";
import SelectionCheck from "./SelectionCheck";

const CARD_STYLE = { height: 60, borderWidth: 1 };

export default function PrayerMethodOption({
  label,
  hint,
  selected,
  onPress,
}: {
  label: string;
  hint?: string;
  selected: boolean;
  onPress: () => void;
}) {
  const palette = useSettingsColors();

  return (
    <SelectableCard
      label={label}
      selected={selected}
      onPress={onPress}
      className="flex-row items-center gap-3 rounded-2xl px-4"
      style={CARD_STYLE}
    >
      <View className="flex-1 justify-center gap-0.5">
        <AppText weight="bold" className="text-[15px]" numberOfLines={1}>
          {label}
        </AppText>
        {hint ? (
          <AppText
            className="text-xs"
            style={{ color: palette.subtitle }}
            numberOfLines={1}
          >
            {hint}
          </AppText>
        ) : null}
      </View>
      <SelectionCheck selected={selected} idleColor={palette.border} />
    </SelectableCard>
  );
}
