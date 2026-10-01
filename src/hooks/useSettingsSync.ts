import { useEffect } from "react";
import i18n from "@/i18n";
import { syncNativeDirection } from "@/i18n/direction";
import { savePersistedState } from "@/store/persist";
import { Store, useAppSelector } from "@/store/Store";

export default function useSettingsSync() {
  const locale = useAppSelector((state) => state.settings.locale);

  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
    syncNativeDirection(locale, () => savePersistedState(Store.getState()));
  }, [locale]);
}
