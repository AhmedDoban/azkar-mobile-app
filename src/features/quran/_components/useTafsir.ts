import { AyahRef, ayahTranslation } from "@/features/azkar/_data/quran";
import { useTranslation } from "react-i18next";

export type Tafsir = { text: string; source: string; arabic: boolean };

let muyassar: string[][] | null = null;

const loadMuyassar = () =>
  (muyassar ??= require("../_data/muyassar.json") as string[][]);

export const preloadTafsir = (ar: boolean) =>
  ar ? loadMuyassar() : ayahTranslation(1, 1);

export default function useTafsir(ref: AyahRef | null): Tafsir | null {
  const { t, i18n } = useTranslation("azkar");
  if (!ref) return null;
  if (i18n.language !== "ar") {
    const text = ayahTranslation(ref.surah, ref.ayah);
    return text
      ? { text, source: t("translationSource"), arabic: false }
      : null;
  }
  const text = loadMuyassar()[ref.surah - 1]?.[ref.ayah - 1];
  return text ? { text, source: t("tafsirSource"), arabic: true } : null;
}
