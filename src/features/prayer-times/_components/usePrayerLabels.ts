import { useTranslation } from "react-i18next";
import { shortTime } from "../_data/time";
import { PrayerName } from "../_data/types";

export default function usePrayerLabels() {
  const { t } = useTranslation("prayer");

  const label = (name: PrayerName, isFriday = new Date().getDay() === 5) =>
    t(`names.${name === "Dhuhr" && isFriday ? "Jumuah" : name}`);

  const formatTime = (hhmm: string) =>
    `${shortTime(hhmm)} ${t(Number(hhmm.split(":")[0]) < 12 ? "am" : "pm")}`;

  return { label, formatTime };
}
