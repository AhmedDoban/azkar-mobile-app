import { useTranslation } from "react-i18next";
import { isRTLLocale } from "@/i18n/direction";

export default function useDirection() {
  const { i18n } = useTranslation();
  const isRTL = isRTLLocale(i18n.language);

  return { isRTL, direction: isRTL ? ("rtl" as const) : ("ltr" as const) };
}
