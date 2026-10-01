import { Locale } from "@/i18n/config";
import { setLocale } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { View } from "react-native";
import { FLAG_SA, FLAG_US } from "../_data/flags";
import LanguageCard from "./LanguageCard";

const LANGUAGES: {
  locale: Locale;
  flag: string;
  label: string;
  hint: string;
}[] = [
  { locale: "ar", flag: FLAG_SA, label: "العربية", hint: "Arabic" },
  { locale: "en", flag: FLAG_US, label: "English", hint: "الإنجليزية" },
];

export default function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((s) => s.settings.locale);

  return (
    <View accessibilityRole="radiogroup" className="gap-3">
      {LANGUAGES.map((lang) => (
        <LanguageCard
          key={lang.locale}
          flag={lang.flag}
          label={lang.label}
          hint={lang.hint}
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
