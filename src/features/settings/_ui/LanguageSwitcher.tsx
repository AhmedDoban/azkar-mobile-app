import { Locale } from "@/i18n/config";
import { setLocale } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { FLAG_SA, FLAG_US } from "../_data/flags";
import LanguageCard from "./LanguageCard";

const LANGUAGES: {
  locale: Locale;
  flag: string;
  label: string;
}[] = [
  { locale: "ar", flag: FLAG_SA, label: "العربية" },
  { locale: "en", flag: FLAG_US, label: "English" },
];

export default function LanguageSwitcher() {
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const locale = useAppSelector((s) => s.settings.locale);

  return (
    <View accessibilityRole="radiogroup" className="gap-3">
      {LANGUAGES.map((lang) => (
        <LanguageCard
          key={lang.locale}
          flag={lang.flag}
          label={lang.label}
          hint={t(`languageNames.${lang.locale}`)}
          arabic={lang.locale === "ar"}
          selected={locale === lang.locale}
          onPress={() => {
            if (locale === lang.locale) return;
            Haptics.selectionAsync();
            dispatch(setLocale(lang.locale));
          }}
        />
      ))}
    </View>
  );
}
