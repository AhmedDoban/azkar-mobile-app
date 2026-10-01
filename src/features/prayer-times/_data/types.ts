import type { IconKey } from "@/components/ui/Icon";

export const PRAYERS = [
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
] as const;

export type PrayerName = (typeof PRAYERS)[number];

export const REMINDER_PRAYERS = [
  "Fajr",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
] as const satisfies readonly PrayerName[];

export const PRAYER_ICONS: Record<PrayerName, IconKey> = {
  Fajr: "fajr",
  Sunrise: "sunrise",
  Dhuhr: "dhuhr",
  Asr: "asr",
  Maghrib: "maghrib",
  Isha: "isha",
};

export interface PrayerTimesResponse {
  region: string;
  country: string;
  prayer_times: Record<PrayerName, string>;
  date: {
    date_en: string;
    date_hijri: {
      day: string;
      year: string;
      weekday: { en: string; ar: string };
      month: { number: number; en: string; ar: string };
    };
  };
  meta: { timezone: string };
}
