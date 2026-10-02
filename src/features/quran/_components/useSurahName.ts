import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { surahName } from "../_data/surahName";

export default function useSurahName() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  return useCallback((id: number) => surahName(id, ar), [ar]);
}
