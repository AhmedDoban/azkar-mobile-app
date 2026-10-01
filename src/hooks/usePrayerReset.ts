import { perPrayerCategoryIds } from "@/features/azkar/_data";
import usePrayerSchedule from "@/features/prayer-times/_components/usePrayerSchedule";
import { startNewPrayer, today } from "@/store/Slices/AzkarSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { useEffect } from "react";

export default function usePrayerReset() {
  const dispatch = useAppDispatch();
  const { prayers } = usePrayerSchedule();
  const current = useAppSelector((s) => s.azkar.prayerPeriod);

  const passed = prayers.filter((p) => p.status === "passed");
  const period = prayers.length
    ? `${today()}:${passed[passed.length - 1]?.name ?? "night"}`
    : null;

  useEffect(() => {
    if (period && period !== current) {
      dispatch(startNewPrayer({ period, categoryIds: perPrayerCategoryIds }));
    }
  }, [period, current, dispatch]);
}
