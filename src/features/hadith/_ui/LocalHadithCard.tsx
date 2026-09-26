import { View } from "react-native";
import { useTranslation } from "react-i18next";
import AppText from "@/components/ui/AppText";
import useArabicTextStyle from "@/hooks/useArabicTextStyle";
import { Locale } from "@/i18n/config";
import { savedLocal } from "../_components/hadithKey";
import { LocalHadith } from "../_data";
import HadithActions from "./HadithActions";
import MetaChip from "./MetaChip";

export default function LocalHadithCard({ hadith }: { hadith: LocalHadith }) {
  const { t, i18n } = useTranslation("hadith");
  const textStyle = useArabicTextStyle(0.85);
  const locale = i18n.language as Locale;
  const source = hadith.source[locale];

  return (
    <View className="gap-4 overflow-hidden rounded-3xl border border-line bg-surface p-5">
      <AppText variant="quran" style={textStyle} selectable>
        {hadith.text.ar}
      </AppText>

      {locale === "en" && (
        <AppText className="leading-6 text-main-gray" selectable>
          {hadith.text.en}
        </AppText>
      )}

      <View className="flex-row flex-wrap items-center gap-2 border-t border-line pt-4">
        <MetaChip value={source} tone="main" />
        <MetaChip value={t("hadithNo", { number: hadith.number })} />
      </View>

      <View className="flex-row items-center gap-2">
        <AppText className="flex-1 text-xs text-main-gray">
          {hadith.chapter[locale]}
        </AppText>
        <HadithActions
          text={`${hadith.text.ar}\n\n${locale === "en" ? hadith.text.en + "\n\n" : ""}${source} — ${hadith.number}`}
          saved={savedLocal(hadith.id)}
        />
      </View>
    </View>
  );
}
