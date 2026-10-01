import useThemeColors from "@/hooks/useThemeColors";
import { Platform, View } from "react-native";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import Screen from "@/components/ui/Screen";
import AppText from "@/components/ui/AppText";
import {
  progressKey,
  resetCategory,
  toggleFavorite,
} from "@/store/Slices/AzkarSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { getCategory } from "../_data";
import useCategoryProgress from "../_components/useCategoryProgress";
import CategoryHeaderActions from "./CategoryHeaderActions";
import ZikrCard from "./ZikrCard";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import TopProgressBar from "./TopProgressBar";
import * as Haptics from "expo-haptics";

export default function CategoryContent({
  categoryId,
  title,
}: {
  categoryId: string;
  title: string;
}) {
  const { t } = useTranslation("azkar");
  const dispatch = useAppDispatch();
  const category = getCategory(categoryId)!;
  const progress = useCategoryProgress(category);
  const isFavorite = useAppSelector((s) =>
    s.azkar.favorites.includes(categoryId),
  );
  const hideCompleted = useAppSelector((s) => s.settings.reading.hideCompleted);
  const counts = useAppSelector((s) => s.azkar.progress);

  const colors = useThemeColors();
  const resetProgress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(resetCategory(categoryId));
  };
  const toggleFavoriteCategory = () => {
    Haptics.selectionAsync();
    dispatch(toggleFavorite(categoryId));
  };

  const actions = (
    <CategoryHeaderActions
      isFavorite={isFavorite}
      canReset={progress.done > 0}
      resetLabel={t("reset")}
      favoriteLabel={t("saveZikr")}
      onReset={resetProgress}
      onToggleFavorite={toggleFavoriteCategory}
    />
  );

  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerLargeTitle: false,
          headerRight: Platform.OS === "ios" ? undefined : () => actions,
          unstable_headerRightItems:
            Platform.OS === "ios"
              ? () => [
                  {
                    type: "button",
                    icon: {
                      type: "sfSymbol",
                      name: isFavorite ? "heart.fill" : "heart",
                    },
                    tintColor: isFavorite ? colors.love : colors.ink,
                    label: t("saveZikr"),
                    onPress: toggleFavoriteCategory,
                  },
                  {
                    type: "button",
                    icon: { type: "sfSymbol", name: "arrow.counterclockwise" },
                    tintColor: colors.ink,
                    disabled: progress.done === 0,
                    label: t("reset"),
                    onPress: resetProgress,
                  },
                ]
              : undefined,
        }}
      />
      <Screen className="gap-4">
        {progress.complete && (
          <View className="rounded-3xl bg-main-soft p-4">
            <AppText
              weight="bold"
              className="text-main"
              style={{ textAlign: "center" }}
            >
              {t("completed")}
            </AppText>
          </View>
        )}

        {category.items
          .filter(
            (zikr) =>
              !hideCompleted ||
              (counts[progressKey(categoryId, zikr.id)] ?? 0) < zikr.count,
          )
          .map((zikr) => (
            <Animated.View
              key={zikr.id}
              entering={FadeIn.duration(250)}
              exiting={FadeOut.duration(250)}
              layout={LinearTransition.duration(250).easing(
                Easing.out(Easing.cubic),
              )}
            >
              <ZikrCard
                categoryId={categoryId}
                zikr={zikr}
                position={{
                  index: category.items.indexOf(zikr) + 1,
                  total: category.items.length,
                }}
              />
            </Animated.View>
          ))}
      </Screen>
      <TopProgressBar done={progress.done} total={progress.total} />
    </>
  );
}
