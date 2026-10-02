import { useTranslation } from "react-i18next";
import type { CityName } from "../_data/cityName";

const ARABIC = /[؀-ۿ]/;

export default function useCityName(city: CityName | null | undefined) {
  const { i18n } = useTranslation();
  if (!city) return null;
  const ar = i18n.language === "ar";
  const name = ar ? city.ar : city.en;
  return ARABIC.test(name) === ar ? name : null;
}
