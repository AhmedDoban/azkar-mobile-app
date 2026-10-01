import { useAppSelector } from "@/store/Store";
import { useEffect, useMemo, useState } from "react";
import { addDays, PrayerConfig, prayerClock } from "../_data/calculate";
import { toHijri } from "../_data/hijri";
import { PrayerName, REMINDER_PRAYERS } from "../_data/types";
import usePrayerLocation from "./usePrayerLocation";

const MINUTE = 60_000;

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
export type PrayerClock = Record<PrayerName, string>;

export interface ScheduledPrayer {
  name: PrayerName;
  time: string;
  status: PrayerStatus;
}

export function getNextPrayer(
  times: PrayerClock,
  tomorrow: PrayerClock,
  now: Date,
) {
  const current = now.getHours() * 60 + now.getMinutes();
  const upcoming = REMINDER_PRAYERS.find((p) => toMinutes(times[p]) > current);
  if (upcoming) {
    return {
      name: upcoming,
      time: times[upcoming],
      minutesLeft: toMinutes(times[upcoming]) - current,
    };
  }
  return {
    name: "Fajr" as const,
    time: tomorrow.Fajr,
    minutesLeft: toMinutes(tomorrow.Fajr) + 24 * 60 - current,
  };
}

export function getPrayerStartingNow(times: PrayerClock, now: Date) {
  const current = now.getHours() * 60 + now.getMinutes();
  return REMINDER_PRAYERS.find((p) => toMinutes(times[p]) === current) ?? null;
}

export function usePrayerConfig(): PrayerConfig | null {
  const location = useAppSelector((s) => s.settings.prayerLocation);
  const method = useAppSelector((s) => s.settings.prayerMethod);
  const asr = useAppSelector((s) => s.settings.asrMethod);
  return useMemo(
    () => (location ? { location, method, asr } : null),
    [location, method, asr],
  );
}

export default function usePrayerSchedule() {
  const now = useNow();
  const { status, retry } = usePrayerLocation();
  const config = usePrayerConfig();
  const dayKey = now.toDateString();

  const day = useMemo(() => {
    if (!config) return null;
    const today = new Date(now);
    return {
      times: prayerClock(config, today),
      tomorrow: prayerClock(config, addDays(today, 1)),
      yesterdayIsha: prayerClock(config, addDays(today, -1)).Isha,
      hijri: toHijri(today),
      city: config.location.city,
    };
  }, [config, dayKey]);

  const times = day?.times;
  const next = day ? getNextPrayer(day.times, day.tomorrow, now) : null;
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
    day,
    status: config ? ("ready" as const) : status,
    retry,
    now,
    prayers,
    next,
    startingNow: times ? getPrayerStartingNow(times, now) : null,
    isFriday: now.getDay() === 5,
  };
}
