import { useEffect, useState } from "react";
import { today } from "@/store/Slices/AzkarSlice";
import { useGetPrayerTimesQuery } from "@/store/Slices/PrayerTimesSlice";
import {
  PrayerName,
  PrayerTimesResponse,
  REMINDER_PRAYERS,
} from "../_data/types";

const MINUTE = 60_000;

/** Re-renders on every minute boundary so the countdown stays current */
function useNow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(
      () => {
        setNow(new Date());
        interval = setInterval(() => setNow(new Date()), MINUTE);
      },
      MINUTE - (Date.now() % MINUTE),
    );
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return now;
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export type PrayerStatus = "passed" | "next" | "upcoming";

export interface ScheduledPrayer {
  name: PrayerName;
  time: string;
  status: PrayerStatus;
}

export function getNextPrayer(
  times: PrayerTimesResponse["prayer_times"],
  now: Date,
) {
  const current = now.getHours() * 60 + now.getMinutes();
  const upcoming = REMINDER_PRAYERS.find((p) => toMinutes(times[p]) > current);
  // After Isha the next prayer is tomorrow's Fajr (times barely shift day to day)
  const name = upcoming ?? "Fajr";
  const target = toMinutes(times[name]) + (upcoming ? 0 : 24 * 60);
  return { name, time: times[name], minutesLeft: target - current };
}

/** The prayer whose time is exactly this minute, if any (drives the adhan screen) */
export function getPrayerStartingNow(
  times: PrayerTimesResponse["prayer_times"],
  now: Date,
) {
  const current = now.getHours() * 60 + now.getMinutes();
  return REMINDER_PRAYERS.find((p) => toMinutes(times[p]) === current) ?? null;
}

export default function usePrayerSchedule() {
  const now = useNow();
  const query = useGetPrayerTimesQuery(today());
  const times = query.data?.prayer_times;
  const next = times ? getNextPrayer(times, now) : null;
  const current = now.getHours() * 60 + now.getMinutes();

  const prayers: ScheduledPrayer[] = times
    ? REMINDER_PRAYERS.map((name) => ({
        name,
        time: times[name],
        status:
          name === next?.name
            ? "next"
            : toMinutes(times[name]) <= current
              ? "passed"
              : "upcoming",
      }))
    : [];

  return {
    ...query,
    now,
    prayers,
    next,
    startingNow: times ? getPrayerStartingNow(times, now) : null,
    isFriday: now.getDay() === 5,
  };
}
