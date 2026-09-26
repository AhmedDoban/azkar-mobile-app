import { useAppSelector } from "@/store/Store";

/**
 * Font size + line height for Arabic adhkar/hadith text, from the Settings
 * slider. `scale` shrinks secondary text (e.g. hadith) relative to adhkar.
 */
export default function useArabicTextStyle(scale = 1) {
  const size = useAppSelector((s) => s.settings.textSize) * scale;
  // Amiri's diacritics need generous leading
  return { fontSize: size, lineHeight: Math.round(size * 1.9) };
}
