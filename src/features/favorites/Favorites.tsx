import { View } from "react-native";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import Screen from "@/components/ui/Screen";
import EmptyState from "@/components/ui/EmptyState";
import SectionTitle from "@/components/ui/SectionTitle";
import { useAppSelector } from "@/store/Store";
import { getCategory, getZikr } from "@/features/azkar/_data";
import CategoryGrid from "@/features/azkar/_ui/CategoryGrid";
import ZikrCard from "@/features/azkar/_ui/ZikrCard";
import { getHadith } from "@/features/hadith/_data";
import DorarHadithCard from "@/features/hadith/_ui/DorarHadithCard";
import LocalHadithCard from "@/features/hadith/_ui/LocalHadithCard";

export default function Favorites() {
  const { t } = useTranslation(["common", "azkar"]);
  const favorites = useAppSelector((s) => s.azkar.favorites);
  const favoriteAdhkar = useAppSelector((s) => s.azkar.favoriteAdhkar);
  const categories = favorites.map(getCategory).filter((c) => c !== undefined);
  const adhkar = favoriteAdhkar.map(getZikr).filter((z) => z !== undefined);
  const savedHadiths = useAppSelector((s) => s.azkar.favoriteHadiths);
  // Local hadiths that no longer exist in the bundled data are skipped
  const hadiths = savedHadiths.filter(
    (h) => h.kind === "dorar" || getHadith(h.id) !== undefined,
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen title={t("tabs.favorites")}>
        {categories.length === 0 && adhkar.length === 0 && hadiths.length === 0 ? (
          <EmptyState
            icon="heart"
            title={t("azkar:favoritesEmpty")}
            hint={t("azkar:favoritesHint")}
          />
        ) : (
          <>
            {adhkar.length > 0 && (
              <View className="gap-3">
                <SectionTitle title={t("azkar:savedAdhkar")} />
                {adhkar.map(({ category, zikr }) => (
                  <ZikrCard
                    key={`${category.id}:${zikr.id}`}
                    categoryId={category.id}
                    zikr={zikr}
                    counting={false}
                  />
                ))}
              </View>
            )}
            {hadiths.length > 0 && (
              <View className="gap-3">
                <SectionTitle title={t("azkar:savedHadiths")} />
                {hadiths.map((saved) =>
                  saved.kind === "dorar" ? (
                    <DorarHadithCard key={saved.key} hadith={saved.hadith} />
                  ) : (
                    <LocalHadithCard
                      key={saved.key}
                      hadith={getHadith(saved.id)!}
                    />
                  ),
                )}
              </View>
            )}
            {categories.length > 0 && (
              <View className="gap-3">
                <SectionTitle title={t("azkar:favoriteCategories")} />
                <CategoryGrid categories={categories} showProgress={false} />
              </View>
            )}
          </>
        )}
      </Screen>
    </>
  );
}
