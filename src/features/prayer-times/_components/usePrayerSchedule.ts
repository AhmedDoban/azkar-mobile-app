import { useAppSelector } from "@/store/Store";
import { useMemo, useSyncExternalStore } from "react";
import { PrayerConfig } from "../_data/calculate";
import { getPrayerDay, getScheduledPrayers } from "../_data/schedule";
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

function useNow() {
  const ms = useSyncExternalStore(subscribe, getNow);
  return useMemo(() => new Date(ms), [ms]);
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
    isFriday: now.getDay() === 5,
  };
}
