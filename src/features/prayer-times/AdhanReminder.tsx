import { today } from "@/store/Slices/AzkarSlice";
import { useAppSelector } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  configurePrayerNotifications,
  onPrayerNotificationOpened,
  syncPrayerNotifications,
} from "./_components/prayerNotifications";
import usePrayerLabels from "./_components/usePrayerLabels";
import usePrayerSchedule from "./_components/usePrayerSchedule";
import { PrayerName, REMINDER_PRAYERS } from "./_data/types";
import AdhanSplash from "./AdhanSplash";

configurePrayerNotifications();

export default function AdhanReminder() {
  const { t, i18n } = useTranslation("prayer");
  const { label } = usePrayerLabels();
  const { data, startingNow } = usePrayerSchedule();
  const reminders = useAppSelector((s) => s.settings.prayerReminders);
  const [active, setActive] = useState<PrayerName | null>(null);
  const shown = useRef(new Set<string>());

  const show = (prayer: PrayerName) => {
    const key = `${today()}:${prayer}`;
    if (shown.current.has(key)) return;
    shown.current.add(key);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setActive(prayer);
  };

  // A reminded prayer starts while the app is open
  useEffect(() => {
    if (startingNow && reminders[startingNow] !== false) show(startingNow);
  }, [startingNow, reminders]);

  // Opened from an adhan notification
  useEffect(
    () =>
      onPrayerNotificationOpened((prayer) => {
        if (REMINDER_PRAYERS.includes(prayer as (typeof REMINDER_PRAYERS)[number])) {
          show(prayer as PrayerName);
        }
      }),
    [],
  );

  // Reschedule when times, bells or language change
  const times = data?.prayer_times;
  useEffect(() => {
    if (!times) return;
    syncPrayerNotifications({
      times,
      reminders,
      title: (prayer) => t("notificationTitle", { prayer: label(prayer) }),
      body: t("notificationBody"),
    });
  }, [times, reminders, i18n.language]);

  return (
    <AdhanSplash
      prayer={active}
      time={active && times ? times[active] : undefined}
      onClose={() => setActive(null)}
    />
  );
}
