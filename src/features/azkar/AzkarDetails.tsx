import { View } from "react-native";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import Screen from "@/components/ui/Screen";
import AppText from "@/components/ui/AppText";
import EmptyState from "@/components/ui/EmptyState";
import IconButton from "@/components/Buttons/IconButton";
import useThemeColors from "@/hooks/useThemeColors";
import { Locale } from "@/i18n/config";
import {
  progressKey,
  resetCategory,
  toggleFavorite,
} from "@/store/Slices/AzkarSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { getCategory } from "./_data";
import useCategoryProgress from "./_components/useCategoryProgress";
import ZikrCard from "./_ui/ZikrCard";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import TopProgressBar from "./_ui/TopProgressBar";
import * as Haptics from "expo-haptics";

export default function AzkarDetails({ id }: { id: string }) {
  const { t, i18n } = useTranslation();
  const category = getCategory(id);

  if (!category) {
    return (
      <Screen>
        <EmptyState icon="book" title={t("somethingWrong")} />
      </Screen>
    );
  }

  return (
    <CategoryContent
      key={category.id}
      categoryId={category.id}
      title={category.title[i18n.language as Locale]}
    />
  );
}

function CategoryContent({
  categoryId,
  title,
}: {
  categoryId: string;
  title: string;
}) {
  const { t } = useTranslation("azkar");
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const category = getCategory(categoryId)!;
  const progress = useCategoryProgress(category);
  const isFavorite = useAppSelector((s) =>
    s.azkar.favorites.includes(categoryId),
  );
  const hideCompleted = useAppSelector((s) => s.settings.reading.hideCompleted);
  const counts = useAppSelector((s) => s.azkar.progress);

  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerLargeTitle: false,
          headerRight: () => (
            <View className="flex-row gap-1">
              <IconButton
                icon="reset"
                color={colors.main}
                className="bg-transparent"
                accessibilityLabel={t("reset")}
                disabled={progress.done === 0}
                style={{ opacity: progress.done === 0 ? 0.4 : 1 }}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  dispatch(resetCategory(categoryId));
                }}
              />
              <IconButton
                icon={isFavorite ? "heartFill" : "heart"}
                color={isFavorite ? colors.orange : colors.main}
                className="bg-transparent"
                onPress={() => dispatch(toggleFavorite(categoryId))}
              />
            </View>
          ),
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
              <ZikrCard categoryId={categoryId} zikr={zikr} />
            </Animated.View>
          ))}
      </Screen>
      <TopProgressBar done={progress.done} total={progress.total} />
    </>
  );
}
