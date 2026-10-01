import { I18nManager, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reloadAppAsync } from "expo";
import { rtlLocales, Locale } from "./config";

const RELOAD_GUARD_KEY = "AZKAR_RTL_RELOAD_FOR";

export const isRTLLocale = (locale: string) =>
  rtlLocales.includes(locale as Locale);

export async function syncNativeDirection(
  locale: Locale,
  beforeReload?: () => Promise<void>,
) {
  if (Platform.OS === "web") return;

  const rtl = isRTLLocale(locale);
  if (I18nManager.isRTL === rtl) {
    await AsyncStorage.removeItem(RELOAD_GUARD_KEY);
    return;
  }

  if ((await AsyncStorage.getItem(RELOAD_GUARD_KEY)) === locale) return;
  await AsyncStorage.setItem(RELOAD_GUARD_KEY, locale);

  I18nManager.allowRTL(rtl);
  I18nManager.forceRTL(rtl);
  await beforeReload?.();
  await reloadAppAsync("Layout direction changed");
}
