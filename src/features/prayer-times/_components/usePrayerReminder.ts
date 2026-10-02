import * as Haptics from "expo-haptics";
import { togglePrayerReminder } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { PrayerName } from "../_data/types";
import { ensureNotificationPermission } from "./prayerNotifications";

export default function usePrayerReminder(
  prayer: PrayerName,
  onDenied: () => void,
) {
  const dispatch = useAppDispatch();
  const enabled = useAppSelector(
    (s) => s.settings.prayerReminders[prayer] !== false,
  );

  const toggle = async () => {
    Haptics.selectionAsync();
    dispatch(togglePrayerReminder(prayer));
    if (!enabled && !(await ensureNotificationPermission())) {
      onDenied();
    }
  };

  return { enabled, toggle };
}
