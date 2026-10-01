import AppText from "@/components/ui/AppText";
import PressableScale from "@/components/ui/PressableScale";
import { SurahSummary, toArabicDigits } from "@/features/azkar/_data/quran";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function SurahRow({ surah }: { surah: SurahSummary }) {
  const { t } = useTranslation("azkar");

  return (
    <Link href={`/mushaf/${surah.id}`} asChild>
      <PressableScale
        scaleTo={0.98}
        className="flex-row items-center gap-3 rounded-2xl border border-line bg-surface px-3 py-3"
      >
        <View className="size-11 items-center justify-center">
          <AppText variant="quran" className="text-[26px] text-main">
            {`۝${toArabicDigits(surah.id)}`}
          </AppText>
        </View>

        <View className="flex-1 gap-0.5">
          <AppText variant="quran" weight="bold" className="text-xl">
            {`سورة ${surah.name}`}
          </AppText>
          <AppText className="text-xs text-main-gray" numberOfLines={1}>
            {`${surah.transliteration} · ${surah.translation}`}
          </AppText>
        </View>

        <View className="items-end gap-0.5">
          <AppText className="text-xs text-main">{t(surah.type)}</AppText>
          <AppText className="text-[11px] text-main-gray">
            {t("versesCount", { count: surah.verses })}
          </AppText>
        </View>
      </PressableScale>
    </Link>
  );
}
