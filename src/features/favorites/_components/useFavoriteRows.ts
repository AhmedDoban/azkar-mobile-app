import { getCategory, getZikr } from "@/features/azkar/_data";
import { getHadith } from "@/features/hadith/_data";
import { useAppSelector } from "@/store/Store";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FavoriteRowData } from "../_data/types";

export default function useFavoriteRows() {
  const { t } = useTranslation("azkar");
  const favorites = useAppSelector((s) => s.azkar.favorites);
  const favoriteAdhkar = useAppSelector((s) => s.azkar.favoriteAdhkar);
  const savedHadiths = useAppSelector((s) => s.azkar.favoriteHadiths);

  return useMemo(() => {
    const categories = favorites
      .map(getCategory)
      .filter((c) => c !== undefined);
    const adhkar = favoriteAdhkar.map(getZikr).filter((z) => z !== undefined);
    const hadiths = savedHadiths.filter(
      (h) => h.kind === "dorar" || getHadith(h.id) !== undefined,
    );
    const list: FavoriteRowData[] = [];
    if (adhkar.length > 0) {
      list.push({
        key: "title:adhkar",
        first: true,
        kind: "title",
        title: t("savedAdhkar"),
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
        title: t("savedHadiths"),
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
        title: t("favoriteCategories"),
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
}
