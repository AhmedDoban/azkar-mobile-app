import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import {
  getSurah,
  getSurahList,
  JUZ_STARTS,
  juzOf,
  pageOf,
} from "@/features/azkar/_data/quran";
import useThemeColors from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import SurahRow from "./SurahRow";
import useLocalDigits from "../_components/useLocalDigits";

export default function JuzList() {
  const { t, i18n } = useTranslation("azkar");
  const colors = useThemeColors();
  const ar = i18n.language === "ar";
  const num = useLocalDigits();

  const groups = useMemo(() => {
    const surahs = getSurahList();
    return JUZ_STARTS.map((start, i) => ({
      juz: i + 1,
      start,
      page: pageOf(start.surah, start.ayah),
      surahs: surahs.filter((s) => juzOf(s.id, 1) === i + 1),
    }));
  }, []);

  return (
    <View className="gap-5">
      {groups.map(({ juz, start, page, surahs }) => {
        const first = getSurah(start.surah);
        return (
          <View key={juz} className="gap-2.5">
            <Link
              href={{
                pathname: "/mushaf/[id]",
                params: { id: start.surah, page },
              }}
              asChild
            >
              <PressableScale
                scaleTo={0.98}
                className="flex-row items-center gap-3 rounded-2xl bg-main-soft px-5 py-3"
              >
                <View className="flex-1">
                  <AppText weight="bold" className="text-main">
                    {t("juzNumber", { juz: num(juz) })}
                  </AppText>
                  <AppText className="text-xs text-main-gray">
                    {`${t("verseRef", {
                      surah: ar ? first?.name : first?.transliteration,
                      ayah: num(start.ayah),
                    })} · ${t("pageNumber", { page: num(page) })}`}
                  </AppText>
                </View>
                <Icon
                  name={ar ? "chevronLeft" : "chevronRight"}
                  size={18}
                  tintColor={colors.main}
                />
              </PressableScale>
            </Link>
            {surahs.map((surah) => (
              <SurahRow key={surah.id} surah={surah} />
            ))}
          </View>
        );
      })}
    </View>
  );
}
