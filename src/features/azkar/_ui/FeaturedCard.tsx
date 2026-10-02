import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Locale } from "@/i18n/config";
import useThemeColors from "@/hooks/useThemeColors";
import { AzkarCategory } from "../_data";
import useCategoryProgress from "../_components/useCategoryProgress";
import ProgressRing from "./ProgressRing";
import TileCard from "./TileCard";

export default memo(function FeaturedCard({
  category,
  showProgress = true,
}: {
  category: AzkarCategory;
  showProgress?: boolean;
}) {
  const { t, i18n } = useTranslation("azkar");
  const colors = useThemeColors();
  const { done, total, complete } = useCategoryProgress(category);

  return (
    <TileCard
      href={`/category/${category.id}`}
      title={category.title[i18n.language as Locale]}
      subtitle={
        !showProgress
          ? t("itemsCount", { count: total })
          : complete
            ? t("done")
            : t("progress", { done, total })
      }
      highlighted={showProgress && complete}
      trailing={
        showProgress ? (
          <ProgressRing
            progress={total ? done / total : 0}
            color={complete ? colors.mainFill : colors.main}
            checkColor={colors.onFill}
            track={colors.surface}
            size={40}
          />
        ) : null
      }
    />
  );
});
