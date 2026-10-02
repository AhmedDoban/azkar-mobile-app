import { FlatList, ListRenderItem, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import Screen from "@/components/ui/Screen";
import { Stack } from "expo-router";
import EmptyState from "@/components/ui/EmptyState";
import SectionTitle from "@/components/ui/SectionTitle";
import useDirection from "@/hooks/useDirection";
import { useAppSelector } from "@/store/Store";
import {
  AzkarCategory,
  getCategory,
  getZikr,
  Zikr,
} from "@/features/azkar/_data";
import CategoryGrid from "@/features/azkar/_ui/CategoryGrid";
import ZikrCard from "@/features/azkar/_ui/ZikrCard";
import { getHadith, LocalHadith } from "@/features/hadith/_data";
import { DorarHadith } from "@/features/hadith/_components/parseDorar";
import DorarHadithCard from "@/features/hadith/_ui/DorarHadithCard";
import LocalHadithCard from "@/features/hadith/_ui/LocalHadithCard";

type Row = { key: string; first: boolean } & (
  | { kind: "title"; title: string }
  | { kind: "zikr"; categoryId: string; zikr: Zikr }
  | { kind: "dorar"; hadith: DorarHadith }
  | { kind: "local"; hadith: LocalHadith }
  | { kind: "categories"; categories: AzkarCategory[] }
);

const CONTENT_STYLE = {
  paddingHorizontal: 16,
  paddingTop: 16,
  paddingBottom: 32,
};

const keyExtractor = (row: Row) => row.key;

const renderRow: ListRenderItem<Row> = ({ item: row, index }) => (
  <View style={{ marginTop: index === 0 ? 0 : row.first ? 24 : 12 }}>
    {row.kind === "title" ? (
      <SectionTitle title={row.title} />
    ) : row.kind === "zikr" ? (
      <ZikrCard categoryId={row.categoryId} zikr={row.zikr} counting={false} />
    ) : row.kind === "dorar" ? (
      <DorarHadithCard hadith={row.hadith} />
    ) : row.kind === "local" ? (
      <LocalHadithCard hadith={row.hadith} />
    ) : (
      <CategoryGrid categories={row.categories} showProgress={false} />
    )}
  </View>
);

export default function Favorites() {
  const { t } = useTranslation(["common", "azkar"]);
  const { direction } = useDirection();
  const favorites = useAppSelector((s) => s.azkar.favorites);
  const favoriteAdhkar = useAppSelector((s) => s.azkar.favoriteAdhkar);
  const savedHadiths = useAppSelector((s) => s.azkar.favoriteHadiths);

  const rows = useMemo(() => {
    const categories = favorites
      .map(getCategory)
      .filter((c) => c !== undefined);
    const adhkar = favoriteAdhkar.map(getZikr).filter((z) => z !== undefined);
    const hadiths = savedHadiths.filter(
      (h) => h.kind === "dorar" || getHadith(h.id) !== undefined,
    );
    const list: Row[] = [];
    if (adhkar.length > 0) {
      list.push({
        key: "title:adhkar",
        first: true,
        kind: "title",
        title: t("azkar:savedAdhkar"),
      });
      for (const { category, zikr } of adhkar) {
        list.push({
          key: `${category.id}:${zikr.id}`,
          first: false,
          kind: "zikr",
          categoryId: category.id,
          zikr,
        });
      }
    }
    if (hadiths.length > 0) {
      list.push({
        key: "title:hadiths",
        first: true,
        kind: "title",
        title: t("azkar:savedHadiths"),
      });
      for (const saved of hadiths) {
        list.push(
          saved.kind === "dorar"
            ? {
                key: saved.key,
                first: false,
                kind: "dorar",
                hadith: saved.hadith,
              }
            : {
                key: saved.key,
                first: false,
                kind: "local",
                hadith: getHadith(saved.id)!,
              },
        );
      }
    }
    if (categories.length > 0) {
      list.push({
        key: "title:categories",
        first: true,
        kind: "title",
        title: t("azkar:favoriteCategories"),
      });
      list.push({
        key: "categories",
        first: false,
        kind: "categories",
        categories,
      });
    }
    return list;
  }, [favorites, favoriteAdhkar, savedHadiths, t]);

  const style = useMemo(() => ({ direction }), [direction]);
  const options = useMemo(() => ({ title: t("tabs.favorites") }), [t]);

  if (rows.length === 0) {
    return (
      <Screen>
        <Stack.Screen options={options} />
        <EmptyState
          icon="heart"
          title={t("azkar:favoritesEmpty")}
          hint={t("azkar:favoritesHint")}
        />
      </Screen>
    );
  }

  return (
    <>
      <Stack.Screen options={options} />
      <FlatList
        className="flex-1 bg-main-bg"
        style={style}
        contentContainerStyle={CONTENT_STYLE}
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        data={rows}
        keyExtractor={keyExtractor}
        renderItem={renderRow}
        initialNumToRender={6}
        windowSize={7}
      />
    </>
  );
}
