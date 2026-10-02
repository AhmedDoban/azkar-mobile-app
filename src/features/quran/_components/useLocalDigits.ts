import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { localDigits } from "../_data/localDigits";

export default function useLocalDigits() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  return useCallback((n: number) => localDigits(n, ar), [ar]);
}
