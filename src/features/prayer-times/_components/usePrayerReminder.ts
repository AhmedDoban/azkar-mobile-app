import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { togglePrayerReminder } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { PrayerName } from "../_data/types";
import { ensureNotificationPermission } from "./prayerNotifications";

export default function usePrayerReminder(prayer: PrayerName) {
  const { t } = useTranslation("prayer");
  const dispatch = useAppDispatch();
  const enabled = useAppSelector(
    (s) => s.settings.prayerReminders[prayer] !== false,
  );

  const toggle = async () => {
    Haptics.selectionAsync();
    dispatch(togglePrayerReminder(prayer));
    if (!enabled && !(await ensureNotificationPermission())) {
      Alert.alert(t("permissionDenied"));
    }
  };

  return { enabled, toggle };
}
