import AppText from "@/components/ui/AppText";
import useSettingsColors from "../_components/useSettingsColors";
import * as Haptics from "expo-haptics";
import { Platform, Switch, View } from "react-native";

const THUMB = "#ffffff";

export default function SettingsSwitchRow({
  title,
  subtitle,
  value,
  onValueChange,
}: {
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  const palette = useSettingsColors();
  const offTrack = palette.track;

  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-1 gap-0.5">
        <AppText weight="bold" className="text-base">
          {title}
        </AppText>
        {subtitle ? (
          <AppText className="text-sm" style={{ color: palette.subtitle }}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      <View style={Platform.OS === "web" ? { direction: "ltr" } : undefined}>
        <Switch
          value={value}
          onValueChange={(next) => {
            Haptics.selectionAsync();
            onValueChange(next);
          }}
          accessibilityLabel={title}
          trackColor={{ false: offTrack, true: palette.switchOn }}
          ios_backgroundColor={offTrack}
          thumbColor={THUMB}
          {...(Platform.OS === "web" ? { activeThumbColor: THUMB } : null)}
        />
      </View>
    </View>
  );
}
