import AdhanReminder from "@/features/prayer-times/AdhanReminder";
import useDailyReset from "@/hooks/useDailyReset";
import usePrayerReset from "@/hooks/usePrayerReset";
import useSettingsSync from "@/hooks/useSettingsSync";

export default function AppEffects() {
  useSettingsSync();
  useDailyReset();
  usePrayerReset();
  return <AdhanReminder />;
}
