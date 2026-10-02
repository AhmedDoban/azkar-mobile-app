import { memo } from "react";
import AppText from "@/components/ui/AppText";
import useArabicTextStyle from "@/hooks/useArabicTextStyle";
import { Locale } from "@/i18n/config";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { savedLocal } from "../_data/hadithKey";
import useHadithColors from "../_components/useHadithColors";
import { LocalHadith } from "../_data";
import HadithDivider from "./HadithDivider";
import HadithActions from "./HadithActions";
import HadithNumberMark from "./HadithNumberMark";
import HadithPaper from "./HadithPaper";

export default memo(function LocalHadithCard({
  hadith,
}: {
  hadith: LocalHadith;
}) {
  const { i18n } = useTranslation("hadith");
  const p = useHadithColors();
  const textStyle = useArabicTextStyle(0.85);
  const locale = i18n.language as Locale;
  const source = hadith.source[locale];

  return (
    <HadithPaper>
      <View className="flex-row items-center gap-2">
        <HadithNumberMark value={String(hadith.number)} />
        <View className="flex-1">
          <AppText
            weight="bold"
            className="text-sm"
            style={{ color: p.accent }}
            numberOfLines={1}
          >
            {source}
          </AppText>
          <AppText
            className="text-xs"
            style={{ color: p.muted }}
            numberOfLines={1}
          >
            {hadith.chapter[locale]}
          </AppText>
        </View>
      </View>

      <AppText variant="quran" style={[textStyle, { color: p.ink }]} selectable>
        {hadith.text.ar}
      </AppText>

      {locale === "en" && (
        <AppText className="leading-6" style={{ color: p.muted }} selectable>
          {hadith.text.en}
        </AppText>
      )}

      <HadithDivider />

      <View className="flex-row justify-center">
        <HadithActions
          text={`${hadith.text.ar}\n\n${locale === "en" ? hadith.text.en + "\n\n" : ""}${source} — ${hadith.number}`}
          saved={savedLocal(hadith.id)}
        />
      </View>
    </HadithPaper>
  );
});
