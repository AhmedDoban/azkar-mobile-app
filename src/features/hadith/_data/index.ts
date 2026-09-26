import raw from "./hadiths.json";
import { Locale } from "@/i18n/config";
import { normalize } from "@/features/azkar/_data";

export interface LocalHadith {
  id: string;
  source: Record<Locale, string>;
  number: number;
  chapter: Record<Locale, string>;
  text: Record<Locale, string>;
}

export const hadiths = raw as LocalHadith[];

const byId = new Map(hadiths.map((h) => [h.id, h]));

export const getHadith = (id: string) => byId.get(id);

/** Same hadith all day, a new one tomorrow */
export function getDailyHadith(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0).getTime();
  const dayOfYear = Math.floor((date.getTime() - start) / 86_400_000);
  return hadiths[(dayOfYear + date.getFullYear()) % hadiths.length];
}

export function searchLocalHadiths(query: string) {
  const q = normalize(query.trim());
  if (!q) return [];
  return hadiths.filter(
    (h) =>
      normalize(h.text.ar).includes(q) || h.text.en.toLowerCase().includes(q),
  );
}

export const hasArabic = (text: string) => /[؀-ۿ]/.test(text);
