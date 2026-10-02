import useThemeColors from "@/hooks/useThemeColors";
import { ListRenderItem, Platform, View } from "react-native";
import { useCallback, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { NativeStackNavigationOptions, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import useDirection from "@/hooks/useDirection";
import AppText from "@/components/ui/AppText";
import {
  progressKey,
  resetCategory,
  toggleFavorite,
} from "@/store/Slices/AzkarSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { getCategory, Zikr } from "../_data";
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

const ENTERING = FadeIn.duration(250);
const EXITING = FadeOut.duration(250);
const LAYOUT = LinearTransition.duration(250).easing(Easing.out(Easing.cubic));
const CONTENT_STYLE = { gap: 16, padding: 16, paddingBottom: 32 };
const keyExtractor = (zikr: Zikr) => String(zikr.id);

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
  const items = useAppSelector(
    (s) =>
      hideCompleted
        ? category.items.filter(
            (zikr) =>
              (s.azkar.progress[progressKey(categoryId, zikr.id)] ?? 0) <
              zikr.count,
          )
        : category.items,
    shallowEqual,
  );

  const colors = useThemeColors();
  const { direction } = useDirection();
  const positions = useMemo(
    () => new Map(category.items.map((zikr, i) => [zikr.id, i + 1])),
    [category],
  );
  const total = category.items.length;
  const canReset = progress.done > 0;

  const resetProgress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(resetCategory(categoryId));
  }, [dispatch, categoryId]);
  const toggleFavoriteCategory = useCallback(() => {
    Haptics.selectionAsync();
    dispatch(toggleFavorite(categoryId));
  }, [dispatch, categoryId]);

  const options = useMemo((): NativeStackNavigationOptions => {
    const actions = (
      <CategoryHeaderActions
        isFavorite={isFavorite}
        canReset={canReset}
        resetLabel={t("reset")}
        favoriteLabel={t("saveZikr")}
        onReset={resetProgress}
        onToggleFavorite={toggleFavoriteCategory}
      />
    );
    return {
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
                disabled: !canReset,
                label: t("reset"),
                onPress: resetProgress,
              },
            ]
          : undefined,
    };
  }, [
    title,
    isFavorite,
    canReset,
    colors.love,
    colors.ink,
    t,
    resetProgress,
    toggleFavoriteCategory,
  ]);

  const style = useMemo(
    () => ({ flex: 1, backgroundColor: colors.bg, direction }),
    [colors.bg, direction],
  );

  const header = useMemo(
    () =>
      progress.complete ? (
        <View className="rounded-3xl bg-main-soft p-4">
          <AppText
            weight="bold"
            className="text-main"
            style={{ textAlign: "center" }}
          >
            {t("completed")}
          </AppText>
        </View>
      ) : null,
    [progress.complete, t],
  );

  const renderItem = useCallback<ListRenderItem<Zikr>>(
    ({ item: zikr }) => (
      <Animated.View
        entering={hideCompleted ? ENTERING : undefined}
        exiting={hideCompleted ? EXITING : undefined}
      >
        <ZikrCard
          categoryId={categoryId}
          zikr={zikr}
          index={positions.get(zikr.id)}
          total={total}
        />
      </Animated.View>
    ),
    [hideCompleted, categoryId, positions, total],
  );

  return (
    <>
      <Stack.Screen options={options} />
      <Animated.FlatList
        style={style}
        contentContainerStyle={CONTENT_STYLE}
        contentInsetAdjustmentBehavior="automatic"
        data={items}
        keyExtractor={keyExtractor}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={7}
        removeClippedSubviews={Platform.OS === "android"}
        itemLayoutAnimation={hideCompleted ? LAYOUT : undefined}
        ListHeaderComponent={header}
        renderItem={renderItem}
      />
      <TopProgressBar done={progress.done} total={progress.total} />
    </>
  );
}
