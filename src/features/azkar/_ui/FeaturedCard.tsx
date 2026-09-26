import { View } from "react-native";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import AppText from "@/components/ui/AppText";
import { Locale } from "@/i18n/config";
import useThemeColors from "@/hooks/useThemeColors";
import { cn } from "@/lib/utils";
import { AzkarCategory } from "../_data";
import useCategoryProgress from "../_components/useCategoryProgress";
import ProgressRing from "./ProgressRing";
import PressableScale from "@/components/ui/PressableScale";

/** Category tile on the teal tint: title and status beside today's progress ring */
export default function FeaturedCard({
  category,
  showProgress = true,
}: {
  category: AzkarCategory;
  /** false = only the item count, no ring (used in Favorites) */
  showProgress?: boolean;
}) {
  const { t, i18n } = useTranslation("azkar");
  const colors = useThemeColors();
  const { done, total, complete } = useCategoryProgress(category);
  const finished = showProgress && complete;

  return (
    <Link href={`/category/${category.id}`} asChild>
      <PressableScale
        className="flex-1 justify-center rounded-3xl bg-main-soft p-4"
      >
        <View className="flex-row items-center gap-3">
          <View className="flex-1 gap-1">
            <AppText weight="bold" className="text-base leading-6" numberOfLines={2}>
              {category.title[i18n.language as Locale]}
            </AppText>
            <AppText
              weight={finished ? "bold" : "regular"}
              className={cn("text-xs", finished ? "text-main" : "text-main-gray")}
            >
              {!showProgress
                ? t("itemsCount", { count: total })
                : complete
                  ? t("done")
                  : t("progress", { done, total })}
            </AppText>
          </View>
          {showProgress ? (
            <ProgressRing
              progress={total ? done / total : 0}
              // The filled "done" circle uses the teal fill pair for contrast
              color={complete ? colors.mainFill : colors.main}
              checkColor={colors.onFill}
              track={colors.surface}
              size={40}
            />
          ) : null}
        </View>
      </PressableScale>
    </Link>
  );
}
