import { I18nManager, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reloadAppAsync } from "expo";
import { rtlLocales, Locale } from "./config";

const RELOAD_GUARD_KEY = "AZKAR_RTL_RELOAD_FOR";

export const isRTLLocale = (locale: string) =>
  rtlLocales.includes(locale as Locale);

/**
 * Makes the native layout direction (tab bar, headers, inputs, gestures) match
 * the locale. I18nManager only applies after a restart, so the app reloads
 * once when the direction has to change.
 */
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

  // If a reload already happened for this locale and the direction still didn't
  // change (the host app doesn't allow RTL), stop instead of reloading forever
  if ((await AsyncStorage.getItem(RELOAD_GUARD_KEY)) === locale) return;
  await AsyncStorage.setItem(RELOAD_GUARD_KEY, locale);

  I18nManager.allowRTL(rtl);
  I18nManager.forceRTL(rtl);
  await beforeReload?.();
  await reloadAppAsync("Layout direction changed");
}
