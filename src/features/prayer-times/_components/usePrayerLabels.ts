import { useTranslation } from "react-i18next";
import { PrayerName } from "../_data/types";

/** Localized prayer names and times shared by the card, adhan screen and notifications */
export default function usePrayerLabels() {
  const { t } = useTranslation("prayer");

  const label = (name: PrayerName, isFriday = new Date().getDay() === 5) =>
    t(`names.${name === "Dhuhr" && isFriday ? "Jumuah" : name}`);

  // "05:18" -> "5:18 ص" / "5:18 AM"
  const formatTime = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${t(h < 12 ? "am" : "pm")}`;
  };

  const formatRemaining = (minutes: number) => {
    if (minutes <= 0) return t("now");
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const parts = [
      h ? t("hours", { count: h }) : null,
      m ? t("minutes", { count: m }) : null,
    ];
    return t("remaining", { time: parts.filter(Boolean).join(" ") });
  };

  return { label, formatTime, formatRemaining };
}
