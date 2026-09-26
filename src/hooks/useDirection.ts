import { useTranslation } from "react-i18next";
import { isRTLLocale } from "@/i18n/direction";

/**
 * Layout direction for the active language. On iOS/Android the native side is
 * also switched with I18nManager (see i18n/direction.ts); the `direction` style
 * keeps our own views right even before that reload happens, and on web.
 */
export default function useDirection() {
  const { i18n } = useTranslation();
  const isRTL = isRTLLocale(i18n.language);

  return { isRTL, direction: isRTL ? ("rtl" as const) : ("ltr" as const) };
}
