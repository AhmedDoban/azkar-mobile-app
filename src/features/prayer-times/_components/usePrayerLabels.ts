import { useTranslation } from "react-i18next";
import { PrayerName } from "../_data/types";

export default function usePrayerLabels() {
  const { t } = useTranslation("prayer");

  const label = (name: PrayerName, isFriday = new Date().getDay() === 5) =>
    t(`names.${name === "Dhuhr" && isFriday ? "Jumuah" : name}`);

  const formatTime = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${t(h < 12 ? "am" : "pm")}`;
  };

  return { label, formatTime };
}
