import SearchHeader from "@/components/Inputs/SearchHeader";
import EmptyState from "@/components/ui/EmptyState";
import Screen from "@/components/ui/Screen";
import OrnamentHeading from "@/components/ui/OrnamentHeading";
import PrayerTimesCard from "@/features/prayer-times/PrayerTimesCard";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { categories, featuredCategories, searchCategories } from "./_data";
import CategoryGrid from "./_ui/CategoryGrid";
import FeaturedCard from "./_ui/FeaturedCard";
import GreetingCard from "./_ui/GreetingCard";

// Featured ones already have their own section, so the grid skips them
const otherCategories = categories.filter((c) => !c.featured);

export default function AzkarHome() {
  const { t } = useTranslation(["common", "azkar"]);
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCategories(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen
        title={t("tabs.azkar")}
        header={
          <SearchHeader
            title={t("tabs.azkar")}
            value={query}
            onChangeText={setQuery}
            placeholder={t("azkar:searchPlaceholder")}
          />
        }
      >
        {searching ? (
          results.length > 0 ? (
            <CategoryGrid categories={results} />
          ) : (
            <EmptyState icon="search" title={t("azkar:noResults")} />
          )
        ) : (
          <>
            <GreetingCard />
            <PrayerTimesCard />

            <View className="gap-4">
              <OrnamentHeading title={t("azkar:featured")} />
              <View className="flex-row flex-wrap gap-3">
                {featuredCategories.map((category) => (
                  <View key={category.id} className="basis-[47%] grow">
                    <FeaturedCard category={category} />
                  </View>
                ))}
              </View>
            </View>

            <View className="gap-4">
              <OrnamentHeading title={t("azkar:allCategories")} />
              <CategoryGrid categories={otherCategories} />
            </View>
          </>
        )}
      </Screen>
    </>
  );
}
