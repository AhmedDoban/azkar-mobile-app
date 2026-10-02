import HeroScreen from "@/components/hero/HeroScreen";
import EmptyState from "@/components/ui/EmptyState";
import OrnamentHeading from "@/components/ui/OrnamentHeading";
import { PAGE_MOSQUES } from "@/constants/mosques";
import { getSurahList, normalizeQuran } from "@/features/azkar/_data/quran";
import { useDeferredValue, useMemo, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import ContinueReadingCard from "./_ui/ContinueReadingCard";
import SavedAyahs from "./_ui/SavedAyahs";
import useVerseSearch from "./_components/useVerseSearch";
import SurahRow from "./_ui/SurahRow";
import JuzList from "./_ui/JuzList";
import KhatmaTab from "./_ui/KhatmaTab";
import PressableScale from "@/components/ui/PressableScale";
import AppText from "@/components/ui/AppText";
import QuranSectionTabs, { QuranSection } from "./_ui/QuranSectionTabs";
import { useAppSelector } from "@/store/Store";
import VerseResultRow from "./_ui/VerseResultRow";

export default function QuranHome() {
  const { t } = useTranslation(["common", "azkar"]);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<QuranSection>("surahs");
  const [section, setSection] = useState<QuranSection>("surahs");
  const [juzChip, setJuzChip] = useState(false);
  const [byJuz, setByJuz] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(
    () => new Set(["surahs", "all"]),
  );
  const [, startTransition] = useTransition();

  const changeSection = (next: QuranSection) => {
    setTab(next);
    startTransition(() => {
      setSection(next);
      setVisited((old) => new Set(old).add(next));
    });
  };

  const changeFilter = (next: boolean) => {
    setJuzChip(next);
    startTransition(() => {
      setByJuz(next);
      setVisited((old) => new Set(old).add(next ? "juz" : "all"));
    });
  };

  const hide = (on: boolean) => (on ? undefined : { display: "none" as const });
  const hasSaved = useAppSelector(
    (s) =>
      s.settings.quranBookmark !== null || s.settings.savedAyahs.length > 0,
  );
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

  const { results: verseResults } = useVerseSearch(deferred);

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
      <View className="gap-4" style={hide(!searching)}>
        <QuranSectionTabs
          value={tab}
          onChange={changeSection}
          labels={{
            surahs: t("azkar:surahsHeading"),
            khatma: t("azkar:khatmaTab"),
            saved: t("azkar:savedTab"),
          }}
        />
        <View className="gap-4" style={hide(section === "surahs")}>
          <View className="flex-row gap-2">
            {[
              { value: false, label: t("azkar:allSurahs") },
              { value: true, label: t("azkar:byJuz") },
            ].map((option) => {
              const selected = juzChip === option.value;
              return (
                <PressableScale
                  key={option.label}
                  scaleTo={0.96}
                  onPress={() => changeFilter(option.value)}
                  accessibilityState={{ selected }}
                  className={
                    selected
                      ? "rounded-full border border-main bg-main-soft px-4 py-1.5"
                      : "rounded-full border border-line px-4 py-1.5"
                  }
                >
                  <AppText
                    weight={selected ? "bold" : "regular"}
                    className={
                      selected ? "text-sm text-main" : "text-sm text-main-gray"
                    }
                  >
                    {option.label}
                  </AppText>
                </PressableScale>
              );
            })}
          </View>
          {visited.has("juz") ? (
            <View style={hide(byJuz)}>
              <JuzList />
            </View>
          ) : null}
          <View className="gap-2.5" style={hide(!byJuz)}>
            {surahs.map((surah) => (
              <SurahRow key={surah.id} surah={surah} />
            ))}
          </View>
        </View>
        {visited.has("khatma") ? (
          <View style={hide(section === "khatma")}>
            <KhatmaTab />
          </View>
        ) : null}
        {section === "saved" ? (
          hasSaved ? (
            <View className="gap-4">
              <ContinueReadingCard />
              <SavedAyahs />
            </View>
          ) : (
            <EmptyState
              icon="bookmark"
              title={t("azkar:noSaved")}
              hint={t("azkar:noSavedHint")}
            />
          )
        ) : null}
      </View>
      {!searching ? null : surahResults.length || verseResults.length ? (
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
