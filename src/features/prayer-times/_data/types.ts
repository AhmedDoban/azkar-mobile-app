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

/** The five daily prayers: listed in the card, each with its own adhan reminder */
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

/** Response of https://quran.yousefheiba.com/api/getPrayerTimes */
export interface PrayerTimesResponse {
  region: string;
  country: string;
  /** "HH:mm" in the region's local time */
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
