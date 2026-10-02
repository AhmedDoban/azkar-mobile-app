import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import {
  AyahRef,
  ayahsOnPage,
  getPage,
  getSurah,
  PAGE_COUNT,
  pageOf,
} from "@/features/azkar/_data/quran";
import { setQuranBookmark } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { router, Stack } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { InteractionManager, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AppText from "@/components/ui/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useMushafColors from "./_components/useMushafColors";
import useThemeColors from "@/hooks/useThemeColors";
import useDirection from "@/hooks/useDirection";
import useRecitation from "./_components/useRecitation";
import { loadMuyassar } from "./_components/useTafsir";
import { loadPageSvg } from "./_components/usePageSvg";
import MushafPage from "./_ui/MushafPage";
import MushafPager from "./_ui/MushafPager";
import { hitTest } from "./_components/pageHitTest";
import PageSlider from "./_ui/PageSlider";
import RecitationPlayer from "./_ui/RecitationPlayer";
import AyahSheet from "./_ui/AyahSheet";

export default function SurahReader({
  id,
  ayah,
  page: startPage,
}: {
  id: number;
  ayah?: number;
  page?: number;
}) {
  const { t } = useTranslation("azkar");
  const c = useMushafColors();
  const theme = useThemeColors();
  const { isRTL, direction } = useDirection();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const bookmark = useAppSelector((s) => s.settings.quranBookmark);
  const recitation = useRecitation();

  const initial = useMemo(
    () => startPage ?? pageOf(id, ayah ?? 1),
    [id, ayah, startPage],
  );
  const [page, setPage] = useState(initial);
  const [area, setArea] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [selected, setSelected] = useState<AyahRef | null>(
    ayah ? { surah: id, ayah } : null,
  );
  const active = recitation.current ?? selected;
  const [chrome, setChrome] = useState(true);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      for (const p of [page + 2, page - 2]) {
        if (p >= 1 && p <= PAGE_COUNT) loadPageSvg(p).catch(() => {});
      }
    });
    return () => task.cancel();
  }, [page]);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      loadMuyassar();
    });
    return () => task.cancel();
  }, []);
  const [sheetAyah, setSheetAyah] = useState<AyahRef | null>(null);
  const fade = useSharedValue(1);

  useEffect(() => {
    fade.set(withTiming(chrome ? 1 : 0, { duration: 200 }));
  }, [chrome, fade]);

  const chromeStyle = useAnimatedStyle(() => ({ opacity: fade.get() }));
  const toggleChrome = useCallback(() => setChrome((v) => !v), []);

  const jump = useCallback((target: number) => {
    setPage(Math.min(PAGE_COUNT, Math.max(1, target)));
  }, []);

  useEffect(() => {
    const current = recitation.current;
    if (!current) return;
    const target = pageOf(current.surah, current.ayah);
    if (target !== page) jump(target);
  }, [recitation.current]);

  const onAyahLongPress = useCallback((ref: AyahRef) => {
    Haptics.selectionAsync();
    setSelected(ref);
    setSheetAyah(ref);
  }, []);

  const activePage = active ? pageOf(active.surah, active.ayah) : null;
  const playFrom = recitation.play;
  const closeSheet = useCallback(() => {
    setSheetAyah(null);
    setSelected(null);
  }, []);
  const playSheet = useCallback(
    (from: AyahRef, until: AyahRef | null) => playFrom(from, until),
    [playFrom],
  );
  const onPageLongPress = useCallback(
    (x: number, y: number) => {
      const ref = hitTest(page, x, y);
      if (ref) onAyahLongPress(ref);
    },
    [page, onAyahLongPress],
  );
  const renderPage = useCallback(
    (p: number) =>
      area ? (
        <MushafPage
          page={p}
          width={area.width}
          height={area.height}
          active={p === activePage ? active : null}
        />
      ) : null,
    [area, activePage, active],
  );

  const play = () => {
    if (recitation.current) recitation.resume();
    else recitation.play(selected ?? ayahsOnPage(page)[0]);
  };

  const bookmarkPage = bookmark ? pageOf(bookmark.surah, bookmark.ayah) : null;
  const bookmarked = bookmarkPage === page;
  const toggleBookmark = () => {
    Haptics.selectionAsync();
    dispatch(setQuranBookmark(bookmarked ? null : ayahsOnPage(page)[0]));
  };

  const title = getSurah(getPage(page).start.surah)?.name ?? "";

  return (
    <View
      className="flex-1"
      style={{ direction: "rtl", backgroundColor: c.page }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: c.page },
        }}
      />

      <View
        className="flex-1"
        style={{ marginTop: insets.top, marginBottom: insets.bottom }}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          if (width !== area?.width || height !== area?.height) {
            setArea({ width, height });
          }
        }}
      >
        {area ? (
          <MushafPager
            page={page}
            width={area.width}
            height={area.height}
            onChange={setPage}
            onTap={toggleChrome}
            onLongPress={onPageLongPress}
            renderPage={renderPage}
          />
        ) : null}
      </View>

      <Animated.View
        pointerEvents={chrome ? "box-none" : "none"}
        className="absolute inset-x-0 top-0 flex-row items-center gap-3 px-3 pb-2"
        style={[
          { paddingTop: insets.top + 6, backgroundColor: c.page, direction },
          chromeStyle,
        ]}
      >
        <PressableScale
          onPress={() => router.back()}
          accessibilityLabel={t("close")}
          hitSlop={10}
          className="size-10 items-center justify-center"
        >
          <Icon
            name={isRTL ? "chevronRight" : "chevronLeft"}
            size={26}
            strokeWidth={2}
            tintColor={theme.isDark ? "#ffffff" : theme.main}
          />
        </PressableScale>
        <AppText
          variant="quran"
          className="flex-1 text-xl"
          style={{ color: c.ink, textAlign: "center" }}
          numberOfLines={1}
        >
          {`سورة ${title}`}
        </AppText>
        <View className="size-10" />
      </Animated.View>

      <Animated.View
        pointerEvents={chrome ? "box-none" : "none"}
        className="absolute inset-x-0 bottom-0 gap-3 px-4 pt-3"
        style={[
          { paddingBottom: insets.bottom + 8, backgroundColor: c.page },
          chromeStyle,
        ]}
      >
        <RecitationPlayer
          current={recitation.current}
          playing={recitation.playing}
          loading={recitation.loading}
          onPlay={play}
          onPause={recitation.pause}
          onStop={recitation.stop}
        />
        <View
          className="flex-row items-center gap-3"
          style={{ direction: "rtl" }}
        >
          <PressableScale
            onPress={toggleBookmark}
            accessibilityLabel={t(
              bookmarked ? "removeBookmark" : "bookmarkPage",
            )}
            className="size-10 items-center justify-center"
          >
            <Icon
              name={bookmarked ? "bookmarkFill" : "bookmark"}
              size={24}
              tintColor={c.accent}
            />
          </PressableScale>
          <PageSlider page={page} onChange={(p) => jump(p)} />
          <PressableScale
            onPress={() => bookmarkPage && jump(bookmarkPage)}
            disabled={!bookmark || bookmarked}
            accessibilityLabel={t("goToBookmark")}
            className="size-10 items-center justify-center"
            style={{ opacity: !bookmark || bookmarked ? 0.3 : 1 }}
          >
            <Icon name="reset" size={22} tintColor={c.accent} />
          </PressableScale>
        </View>
      </Animated.View>
      <AyahSheet ayah={sheetAyah} onClose={closeSheet} onPlay={playSheet} />
    </View>
  );
}
