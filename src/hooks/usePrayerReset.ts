import { perPrayerCategoryIds } from "@/features/azkar/_data";
import {
  getLastPassedPrayer,
  useClock,
  usePrayerConfig,
  usePrayerDay,
} from "@/features/prayer-times/_components/usePrayerSchedule";
import { startNewPrayer } from "@/store/Slices/AzkarSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { useEffect } from "react";

export default function usePrayerReset() {
  const dispatch = useAppDispatch();
  const day = usePrayerDay(usePrayerConfig());
  const current = useAppSelector((s) => s.azkar.prayerPeriod);

  const period = useClock((now) =>
    day
      ? `${now.toLocaleDateString("en-CA")}:${getLastPassedPrayer(day, now) ?? "night"}`
      : null,
  );

  useEffect(() => {
    if (period && period !== current) {
      dispatch(startNewPrayer({ period, categoryIds: perPrayerCategoryIds }));
    }
  }, [period, current, dispatch]);
}
