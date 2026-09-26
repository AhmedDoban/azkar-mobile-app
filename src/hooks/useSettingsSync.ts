import { useEffect } from "react";
import i18n from "@/i18n";
import { syncNativeDirection } from "@/i18n/direction";
import { savePersistedState } from "@/store/persist";
import { Store, useAppSelector } from "@/store/Store";

/** Applies the saved language to i18next and to the native layout direction */
export default function useSettingsSync() {
  const locale = useAppSelector((state) => state.settings.locale);

  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
    // Save first: the persist middleware debounces, and a reload may follow
    syncNativeDirection(locale, () => savePersistedState(Store.getState()));
  }, [locale]);
}
