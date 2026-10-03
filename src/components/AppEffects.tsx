import AdhanReminder from "@/features/prayer-times/AdhanReminder";
import useReminderSync from "@/features/reminders/_components/useReminderSync";
import useAppIconSync from "@/hooks/useAppIconSync";
import useDailyReset from "@/hooks/useDailyReset";
import usePrayerReset from "@/hooks/usePrayerReset";
import useSettingsSync from "@/hooks/useSettingsSync";

export default function AppEffects() {
  useSettingsSync();
  useAppIconSync();
  useReminderSync();
  useDailyReset();
  usePrayerReset();
  return <AdhanReminder />;
}
