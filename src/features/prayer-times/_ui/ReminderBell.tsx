import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import Icon from "@/components/ui/Icon";
import useThemeColors from "@/hooks/useThemeColors";
import { togglePrayerReminder } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { PrayerName } from "../_data/types";
import { ensureNotificationPermission } from "../_components/prayerNotifications";
import PressableScale from "@/components/ui/PressableScale";

/** Bell = adhan reminder on, slashed bell = off */
export default function ReminderBell({
  prayer,
  highlight,
  tint,
}: {
  prayer: PrayerName;
  highlight?: boolean;
  /** Overrides the icon color (e.g. on a filled background) */
  tint?: string;
}) {
  const { t } = useTranslation("prayer");
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const enabled = useAppSelector(
    (s) => s.settings.prayerReminders[prayer] !== false,
  );

  const onPress = async () => {
    Haptics.selectionAsync();
    dispatch(togglePrayerReminder(prayer));
    if (!enabled && !(await ensureNotificationPermission())) {
      Alert.alert(t("permissionDenied"));
    }
  };

  return (
    <PressableScale
      scaleTo={0.85}
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="switch"
      accessibilityState={{ checked: enabled }}
      accessibilityLabel={t(enabled ? "reminderOn" : "reminderOff")}
      className="size-8 items-center justify-center rounded-full"
    >
      <Icon
        name={enabled ? "bell" : "bellSlash"}
        size={15}
        tintColor={
          tint ??
          (!enabled ? colors.gray : highlight ? colors.orange : colors.main)
        }
      />
    </PressableScale>
  );
}
