import { useAppSelector } from "@/store/Store";
import { shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import type { SettingsSectionId } from "../_data/sections";

export default function useSectionSummary() {
  const { t } = useTranslation("settings");
  const settings = useAppSelector(
    (s) => ({
      locale: s.settings.locale,
      theme: s.settings.theme,
      palette: s.settings.palette,
      textSize: s.settings.textSize,
      prayerMethod: s.settings.prayerMethod,
      adhanSound: s.settings.adhanSound,
      customAdhan: s.settings.customAdhan,
      dhikrReminder: s.settings.reminders.dhikr.enabled,
      quranReminder: s.settings.reminders.quran.enabled,
    }),
    shallowEqual,
  );

  return (id: SettingsSectionId): string | null => {
    switch (id) {
      case "language":
        return t(`languageNames.${settings.locale}`);
      case "appearance":
        return `${t(settings.theme)} · ${t(`palettes.${settings.palette}`)}`;
      case "reading":
        return String(settings.textSize);
      case "prayer":
        return t(`methods.${settings.prayerMethod}`);
      case "adhan":
        return settings.adhanSound === "custom"
          ? (settings.customAdhan?.name ?? t("sounds.custom"))
          : t(`sounds.${settings.adhanSound}`);
      case "reminders": {
        const on = [
          settings.dhikrReminder ? t("reminders.dhikr.short") : null,
          settings.quranReminder ? t("reminders.quran.short") : null,
        ].filter(Boolean);
        return on.length ? on.join(" · ") : t("reminders.off");
      }
      default:
        return null;
    }
  };
}
