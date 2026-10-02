import { useAppSelector } from "@/store/Store";
import { useMemo, useSyncExternalStore } from "react";
import { addDays, PrayerConfig, prayerClock } from "../_data/calculate";
import { HijriDate, toHijri } from "../_data/hijri";
import { PrayerName, REMINDER_PRAYERS } from "../_data/types";
import usePrayerLocation from "./usePrayerLocation";

const MINUTE = 60_000;

const listeners = new Set<() => void>();
let nowMs = Date.now();
let timer: ReturnType<typeof setTimeout> | undefined;

const scheduleTick = () => {
  timer = setTimeout(tick, MINUTE - (Date.now() % MINUTE));
};

const tick = () => {
  nowMs = Date.now();
  listeners.forEach((listener) => listener());
  scheduleTick();
};

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    nowMs = Date.now();
    scheduleTick();
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size && timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };
}

const getNow = () => nowMs;

export function useClock<T extends string | number | boolean | null>(
  select: (now: Date) => T,
): T {
  return useSyncExternalStore(subscribe, () => select(new Date(nowMs)));
}

export function useNow() {
  const ms = useSyncExternalStore(subscribe, getNow);
  return useMemo(() => new Date(ms), [ms]);
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

export interface PrayerDay {
  times: PrayerClock;
  tomorrow: PrayerClock;
  yesterdayIsha: string;
  hijri: HijriDate;
  city: PrayerConfig["location"]["city"];
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

export function getScheduledPrayers(day: PrayerDay, now: Date) {
  const next = getNextPrayer(day.times, day.tomorrow, now);
  const current = now.getHours() * 60 + now.getMinutes();
  const prayers: ScheduledPrayer[] = REMINDER_PRAYERS.map((name) => ({
    name,
    time: day.times[name],
    status:
      name === next.name
        ? "next"
        : toMinutes(day.times[name]) <= current
          ? "passed"
          : "upcoming",
  }));
  return { next, prayers };
}

export function getLastPassedPrayer(day: PrayerDay, now: Date) {
  const passed = getScheduledPrayers(day, now).prayers.filter(
    (p) => p.status === "passed",
  );
  return passed[passed.length - 1]?.name ?? null;
}

let cachedDay: { config: PrayerConfig; key: string; day: PrayerDay } | null =
  null;

function getPrayerDay(config: PrayerConfig, now: Date): PrayerDay {
  const key = now.toDateString();
  if (
    cachedDay &&
    cachedDay.key === key &&
    cachedDay.config.location === config.location &&
    cachedDay.config.method === config.method &&
    cachedDay.config.asr === config.asr
  ) {
    return cachedDay.day;
  }
  const today = new Date(now);
  const day = {
    times: prayerClock(config, today),
    tomorrow: prayerClock(config, addDays(today, 1)),
    yesterdayIsha: prayerClock(config, addDays(today, -1)).Isha,
    hijri: toHijri(today),
    city: config.location.city,
  };
  cachedDay = { config, key, day };
  return day;
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

export function usePrayerDay(config: PrayerConfig | null) {
  const dayKey = useClock((now) => now.toDateString());
  return useMemo(
    () => (config ? getPrayerDay(config, new Date(getNow())) : null),
    [config, dayKey],
  );
}

export default function usePrayerSchedule() {
  const now = useNow();
  const { status, retry } = usePrayerLocation();
  const config = usePrayerConfig();
  const day = usePrayerDay(config);

  const schedule = useMemo(
    () => (day ? getScheduledPrayers(day, now) : null),
    [day, now],
  );

  return {
    day,
    status: config ? ("ready" as const) : status,
    retry,
    now,
    prayers: schedule?.prayers ?? [],
    next: schedule?.next ?? null,
    startingNow: day ? getPrayerStartingNow(day.times, now) : null,
    isFriday: now.getDay() === 5,
  };
}
