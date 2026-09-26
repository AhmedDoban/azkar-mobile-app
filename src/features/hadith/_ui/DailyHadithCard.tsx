import { View } from "react-native";
import { useTranslation } from "react-i18next";
import AppText from "@/components/ui/AppText";

import Icon from "@/components/ui/Icon";
import { Locale } from "@/i18n/config";
import useThemeColors from "@/hooks/useThemeColors";
import { savedLocal } from "../_components/hadithKey";
import { getDailyHadith } from "../_data";
import HadithActions from "./HadithActions";

export default function DailyHadithCard() {
  const { t, i18n } = useTranslation("hadith");
  const colors = useThemeColors();
  const hadith = getDailyHadith();
  const locale = i18n.language as Locale;

  return (
    <View className="gap-3 overflow-hidden border border-hero-border rounded-3xl bg-hero p-5">
      <View className="absolute -end-16 -top-16 size-44 rounded-full bg-hero-blob" />

      <View className="flex-row items-center gap-2">
        <Icon name="quote" size={16} tintColor={colors.yellow} />
        <AppText weight="bold" className="text-main-yellow">
          {t("dailyHadith")}
        </AppText>
      </View>

      <AppText
        variant="quran"
        className="text-xl leading-[40px] text-on-hero"
        selectable
      >
        {hadith.text.ar}
      </AppText>
      {locale === "en" && (
        <AppText className="leading-6 text-on-hero-muted">
          {hadith.text.en}
        </AppText>
      )}
      <View className="flex-row items-center gap-2">
        <AppText className="flex-1 text-xs text-on-hero-muted">
          {hadith.source[locale]} · {t("hadithNo", { number: hadith.number })}
        </AppText>
        <HadithActions
          text={`${hadith.text.ar}\n\n${hadith.source[locale]} — ${hadith.number}`}
          saved={savedLocal(hadith.id)}
          tint={colors.onHero}
          buttonClassName="bg-hero-blob"
        />
      </View>
    </View>
  );
}
