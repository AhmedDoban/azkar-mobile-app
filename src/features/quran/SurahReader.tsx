import IconButton from "@/components/Buttons/IconButton";
import EmptyState from "@/components/ui/EmptyState";
import { getSurah, juzOf } from "@/features/azkar/_data/quran";
import { useAppSelector } from "@/store/Store";
import { Stack, useFocusEffect } from "expo-router";
import * as Haptics from "expo-haptics";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import {
  buildMushaf,
  positionKey,
  stretchedLineHeight,
  verseOffset,
} from "./_components/buildPages";
import { lineHeightFor, PAGE } from "./_components/pageLayout";
import useMushafColors from "./_components/useMushafColors";
import useMushafLines from "./_components/useMushafLines";
import LineMeasurer from "./_ui/LineMeasurer";
import MushafPage from "./_ui/MushafPage";
import PageNumber from "./_ui/PageNumber";

export default function SurahReader({
  id,
  ayah,
}: {
  id: number;
  ayah?: number;
}) {
  const { t } = useTranslation("common");
  const mushaf = useMushafColors();
  const insets = useSafeAreaInsets();
  const tabBarSpace = Platform.OS === "ios" ? insets.bottom : 0;
  const surah = getSurah(id);
  const [area, setArea] = useState<{ width: number; height: number } | null>(
    null,
  );
  const savedFontSize = useAppSelector((s) => s.settings.quranSize);
  const [fontSize, setFontSize] = useState(savedFontSize);
  useFocusEffect(
    useCallback(() => setFontSize(savedFontSize), [savedFontSize]),
  );
  const textWidth = area ? area.width - PAGE.paddingX * 2 : 0;
  const { linesOf, isMeasured, save, version, lineHeight } = useMushafLines(
    textWidth,
    fontSize,
  );

  const pages = useMemo(
    () => (area ? buildMushaf(linesOf, area.height, lineHeight) : []),
    [area, version, linesOf, lineHeight],
  );

  const [anchor, setAnchor] = useState(() =>
    surah && ayah
      ? positionKey(id, verseOffset(surah, ayah))
      : positionKey(id, -1),
  );
  const [direction, setDirection] = useState(1);

  const index = useMemo(() => {
    let found = 0;
    pages.forEach((page, i) => {
      if (page.start <= anchor) found = i;
    });
    return found;
  }, [pages, anchor]);

  const current = pages[index];

  const pending = useMemo(() => {
    if (Platform.OS === "web" || !area) return null;
    const near = [id, id - 1, id + 1];
    for (const page of pages.slice(Math.max(0, index - 1), index + 2)) {
      for (const segment of page.segments) near.push(segment.surahId);
    }
    return near.find((n) => n >= 1 && n <= 114 && !isMeasured(n)) ?? null;
  }, [pages, index, id, area, isMeasured]);

  if (!surah) return <EmptyState icon="quran" title={t("somethingWrong")} />;

  const goTo = (target: number) => {
    if (target < 0 || target >= pages.length) return;
    Haptics.selectionAsync();
    setDirection(target > index ? 1 : -1);
    setAnchor(pages[target].start);
  };

  const swipe = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-24, 24])
    .failOffsetY([-16, 16])
    .onEnd((e) => {
      if (e.translationX > 60) goTo(index + 1);
      else if (e.translationX < -60) goTo(index - 1);
    });

  const pageSurah = current ? (getSurah(current.surahId) ?? surah) : surah;

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: mushaf.page, paddingBottom: tabBarSpace }}
      onLayout={(e) => {
        const { width } = e.nativeEvent.layout;
        const height = e.nativeEvent.layout.height - tabBarSpace;
        if (width !== area?.width || height !== area?.height) {
          setArea({ width, height });
        }
      }}
    >
      {pending !== null ? (
        <LineMeasurer
          surahId={pending}
          width={textWidth}
          fontSize={fontSize}
          onLines={save}
        />
      ) : null}
      <Stack.Screen
        options={{
          title: pageSurah.name,
          gestureEnabled: false,
          fullScreenGestureEnabled: false,
          headerStyle: { backgroundColor: mushaf.page },
          contentStyle: { backgroundColor: mushaf.page },
        }}
      />
      {current ? (
        <GestureDetector gesture={swipe}>
          <Animated.View
            key={current.start}
            className="flex-1"
            entering={(direction > 0 ? SlideInLeft : SlideInRight).duration(
              260,
            )}
          >
            <MushafPage
              segments={current.segments}
              fontSize={fontSize}
              lineHeight={
                (lineHeightFor(fontSize) *
                  stretchedLineHeight(current, lineHeight)) /
                lineHeight
              }
              surahName={pageSurah.name}
              juz={juzOf(current.surahId, current.verse)}
              footer={
                <View
                  className="flex-row items-center gap-4"
                  style={{ direction: "ltr" }}
                >
                  <IconButton
                    icon="chevronLeft"
                    color={mushaf.gold}
                    accessibilityLabel={t("nextPage")}
                    disabled={index === pages.length - 1}
                    style={{
                      opacity: index === pages.length - 1 ? 0.3 : 1,
                      backgroundColor: "transparent",
                    }}
                    onPress={() => goTo(index + 1)}
                  />
                  <PageNumber page={index + 1} />
                  <IconButton
                    icon="chevronRight"
                    color={mushaf.gold}
                    accessibilityLabel={t("previousPage")}
                    disabled={index === 0}
                    style={{
                      opacity: index === 0 ? 0.3 : 1,
                      backgroundColor: "transparent",
                    }}
                    onPress={() => goTo(index - 1)}
                  />
                </View>
              }
            />
          </Animated.View>
        </GestureDetector>
      ) : null}
    </View>
  );
}
