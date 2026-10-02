import AppText from "@/components/ui/AppText";
import PressableScale from "@/components/ui/PressableScale";
import { toArabicDigits, VerseMatch } from "@/features/azkar/_data/quran";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useLocalDigits from "../_components/useLocalDigits";
import useSurahName from "../_components/useSurahName";

export default function VerseResultRow({ verse }: { verse: VerseMatch }) {
  const { t, i18n } = useTranslation("azkar");
  const ar = i18n.language === "ar";
  const num = useLocalDigits();
  const surahName = useSurahName();

  return (
    <Link
      href={{
        pathname: "/mushaf/[id]",
        params: { id: verse.surahId, ayah: verse.ayah },
      }}
      asChild
    >
      <PressableScale
        scaleTo={0.98}
        className="gap-2 rounded-2xl border border-line bg-surface px-4 py-3"
      >
        {ar ? (
          <AppText
            variant="quran"
            className="text-xl leading-10"
            numberOfLines={3}
          >
            {`${verse.text} ${toArabicDigits(verse.ayah)}`}
          </AppText>
        ) : (
          <AppText className="text-sm leading-6" numberOfLines={3}>
            {verse.translation}
          </AppText>
        )}
        <View className="flex-row">
          <AppText weight="bold" className="text-xs text-main">
            {t("verseRef", {
              surah: surahName(verse.surahId),
              ayah: num(verse.ayah),
            })}
          </AppText>
        </View>
      </PressableScale>
    </Link>
  );
}
