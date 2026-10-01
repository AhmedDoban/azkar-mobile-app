import { useTranslation } from "react-i18next";
import type { CityName } from "../_data/cityName";

export default function useCityName(city: CityName | null | undefined) {
  const { i18n } = useTranslation();
  if (!city) return null;
  return i18n.language === "ar" ? city.ar : city.en;
}
