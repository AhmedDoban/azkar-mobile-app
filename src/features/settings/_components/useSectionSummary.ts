import { useAppSelector } from "@/store/Store";
import { useTranslation } from "react-i18next";
import type { SettingsSectionId } from "../_data/sections";

export default function useSectionSummary() {
  const { t } = useTranslation("settings");
  const settings = useAppSelector((s) => s.settings);

  return (id: SettingsSectionId): string | null => {
    switch (id) {
      case "language":
        return settings.locale === "ar" ? "العربية" : "English";
      case "appearance":
        return `${t(settings.theme)} · ${t(`palettes.${settings.palette}`)}`;
      case "reading":
        return `${settings.textSize} · ${settings.quranSize}`;
      case "prayer":
        return t(`methods.${settings.prayerMethod}`);
      case "adhan":
        return settings.adhanSound === "custom"
          ? (settings.customAdhan?.name ?? t("sounds.custom"))
          : t(`sounds.${settings.adhanSound}`);
      default:
        return null;
    }
  };
}
