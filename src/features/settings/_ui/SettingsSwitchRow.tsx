import AppText from "@/components/ui/AppText";
import useThemeColors from "@/hooks/useThemeColors";
import * as Haptics from "expo-haptics";
import { Platform, Switch, View } from "react-native";

/**
 * Settings row with the platform switch. On iOS 26 the native switch is the
 * Liquid Glass one: its knob turns into a glass lens while it's held.
 */
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
  const colors = useThemeColors();

  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-1 gap-0.5">
        <AppText weight="bold" className="text-base">
          {title}
        </AppText>
        {subtitle ? (
          <AppText className="text-sm text-main-gray">{subtitle}</AppText>
        ) : null}
      </View>
      {/* React Native Web misplaces the knob in RTL; native switches handle RTL themselves */}
      <View style={Platform.OS === "web" ? { direction: "ltr" } : undefined}>
        <Switch
          value={value}
          onValueChange={(next) => {
            Haptics.selectionAsync();
            onValueChange(next);
          }}
          accessibilityLabel={title}
          // Brand teal when on; the system handles the glass knob and animation
          trackColor={{
            false: colors.surfaceMuted,
            true: colors.isDark ? "#667176" : colors.main,
          }}
          ios_backgroundColor={colors.surfaceMuted}
          // A custom thumb color on iOS would replace the glass knob, so Android only
          thumbColor={Platform.OS === "android" ? "#ffffff" : undefined}
        />
      </View>
    </View>
  );
}
