import AppText from "@/components/ui/AppText";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import useSettingsColors from "../_components/useSettingsColors";
import SelectableCard from "./SelectableCard";
import SelectionCheck from "./SelectionCheck";

export default function LanguageCard({
  flag,
  label,
  hint,
  arabic,
  selected,
  onPress,
}: {
  flag: string;
  label: string;
  hint: string;
  arabic: boolean;
  selected: boolean;
  onPress: () => void;
}) {
  const palette = useSettingsColors();

  return (
    <SelectableCard label={label} selected={selected} onPress={onPress}>
      <View
        className="size-11 overflow-hidden rounded-full"
        style={{ borderWidth: 1, borderColor: palette.border }}
      >
        <SvgXml xml={flag} width="100%" height="100%" />
      </View>

      <View className="flex-1">
        <AppText weight="bold" arabic={arabic} className="text-base">
          {label}
        </AppText>
        <AppText className="text-xs" style={{ color: palette.subtitle }}>
          {hint}
        </AppText>
      </View>

      <SelectionCheck selected={selected} idleColor={palette.subtitle} />
    </SelectableCard>
  );
}
