import HeroScreen from "@/components/hero/HeroScreen";
import EmptyState from "@/components/ui/EmptyState";
import OrnamentHeading from "@/components/ui/OrnamentHeading";
import { PAGE_MOSQUES } from "@/constants/mosques";
import PrayerTimesCard from "@/features/prayer-times/PrayerTimesCard";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import {
  categories,
  dailyCategories,
  isFriday,
  searchCategories,
} from "./_data";
import CategoryGrid from "./_ui/CategoryGrid";
import FeaturedCard from "./_ui/FeaturedCard";
import SurahCard from "./_ui/SurahCard";
import VerseOfDayCard from "./_ui/VerseOfDayCard";

const otherCategories = categories.filter((c) => !c.featured);

export default function AzkarHome() {
  const { t } = useTranslation(["azkar", "common"]);
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCategories(query), [query]);
  const searching = query.trim().length > 0;
  const friday = isFriday();
  const daily = dailyCategories();

  return (
    <HeroScreen
      hero={{
        title: t("common:tabs.azkar"),
        subtitle: t("tagline"),
        source: PAGE_MOSQUES.home,
        action: {
          icon: "heart",
          label: t("openFavorites"),
          onPress: () => router.push("/favorites"),
        },
        search: {
          value: query,
          onChangeText: setQuery,
          placeholder: t("searchPlaceholder"),
        },
      }}
    >
      {searching ? (
        results.length > 0 ? (
          <CategoryGrid categories={results} />
        ) : (
          <EmptyState icon="search" title={t("noResults")} />
        )
      ) : (
        <>
          <PrayerTimesCard />

          <View className="gap-4">
            <OrnamentHeading title={t("featured")} />
            <View className="flex-row flex-wrap gap-3">
              {friday ? (
                <View className="basis-[47%] grow">
                  <SurahCard
                    surahId={18}
                    title={t("surahKahf")}
                    subtitle={t("fridaySunnah")}
                  />
                </View>
              ) : null}
              {daily.map((category) => (
                <View key={category.id} className="basis-[47%] grow">
                  <FeaturedCard category={category} />
                </View>
              ))}
              <View className="basis-[47%] grow">
                <SurahCard
                  surahId={67}
                  title={t("surahMulk")}
                  subtitle={t("mulkHint")}
                />
              </View>
            </View>
          </View>

          <VerseOfDayCard />

          <View className="gap-4">
            <OrnamentHeading title={t("allCategories")} />
            <CategoryGrid categories={otherCategories} />
          </View>
        </>
      )}
    </HeroScreen>
  );
}
