import { getSurah } from "@/features/azkar/_data/quran";

export const surahName = (id: number, ar: boolean) => {
  const surah = getSurah(id);
  if (!surah) return "";
  return ar ? surah.name : surah.transliteration;
};
