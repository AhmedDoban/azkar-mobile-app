import HeroScreen from "@/components/hero/HeroScreen";
import EmptyState from "@/components/ui/EmptyState";
import OrnamentHeading from "@/components/ui/OrnamentHeading";
import { PAGE_MOSQUES } from "@/constants/mosques";
import {
  getSurahList,
  normalizeQuran,
  searchVerses,
} from "@/features/azkar/_data/quran";
import { useDeferredValue, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import SurahRow from "./_ui/SurahRow";
import VerseResultRow from "./_ui/VerseResultRow";

export default function QuranHome() {
  const { t } = useTranslation(["common", "azkar"]);
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const surahs = useMemo(getSurahList, []);
  const q = normalizeQuran(deferred.trim());
  const searching = q.length > 0;

  const surahResults = useMemo(() => {
    if (!q) return surahs;
    return surahs.filter(
      (s) =>
        normalizeQuran(s.name).includes(q) ||
        s.transliteration.toLowerCase().includes(q) ||
        s.translation.toLowerCase().includes(q) ||
        String(s.id) === q,
    );
  }, [q, surahs]);

  const verseResults = useMemo(() => searchVerses(deferred), [deferred]);

  return (
    <HeroScreen
      hero={{
        title: t("tabs.quran"),
        subtitle: t("azkar:quranTagline"),
        source: PAGE_MOSQUES.quran,
        height: 220,
        search: {
          value: query,
          onChangeText: setQuery,
          placeholder: t("azkar:surahSearch"),
        },
      }}
    >
      {!searching ? (
        <View className="gap-2.5">
          {surahs.map((surah) => (
            <SurahRow key={surah.id} surah={surah} />
          ))}
        </View>
      ) : surahResults.length || verseResults.length ? (
        <>
          {surahResults.length ? (
            <View className="gap-3">
              <OrnamentHeading title={t("azkar:surahsHeading")} />
              <View className="gap-2.5">
                {surahResults.map((surah) => (
                  <SurahRow key={surah.id} surah={surah} />
                ))}
              </View>
            </View>
          ) : null}
          {verseResults.length ? (
            <View className="gap-3">
              <OrnamentHeading title={t("azkar:versesHeading")} />
              <View className="gap-2.5">
                {verseResults.map((verse) => (
                  <VerseResultRow
                    key={`${verse.surahId}:${verse.ayah}`}
                    verse={verse}
                  />
                ))}
              </View>
            </View>
          ) : null}
        </>
      ) : (
        <EmptyState icon="search" title={t("azkar:noResults")} />
      )}
    </HeroScreen>
  );
}
