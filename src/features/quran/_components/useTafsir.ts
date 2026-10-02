import { AyahRef } from "@/features/azkar/_data/quran";

export type Tafsir = { text: string; source: string };

let muyassar: string[][] | null = null;

export const loadMuyassar = () =>
  (muyassar ??= require("../_data/muyassar.json") as string[][]);

export default function useTafsir(ref: AyahRef | null): Tafsir | null {
  if (!ref) return null;
  const text = loadMuyassar()[ref.surah - 1]?.[ref.ayah - 1];
  return text ? { text, source: "التفسير الميسر" } : null;
}
