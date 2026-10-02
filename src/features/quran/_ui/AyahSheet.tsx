import AppText from "@/components/ui/AppText";
import Icon, { IconKey } from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import {
  AyahRef,
  ayahsOnPage,
  ayahText,
  getSurah,
  pageOf,
  toArabicDigits,
} from "@/features/azkar/_data/quran";
import {
  completeWird,
  setAyahColor,
  setQuranBookmark,
  toggleSavedAyah,
} from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { memo, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import usePopupColors from "../_components/usePopupColors";
import useTafsir from "../_components/useTafsir";
import { todayWirdBounds } from "../_data/khatma";

export const AYAH_COLORS = [
  "#edb98b",
  "#e5cf6b",
  "#a6d58f",
  "#9dbeeb",
  "#c5a9ec",
];

type Props = {
  ayah: AyahRef | null;
  onClose: () => void;
  onPlay: (from: AyahRef, until: AyahRef | null) => void;
};

function SectionTitle({ children }: { children: ReactNode }) {
  const c = usePopupColors();
  return (
    <AppText weight="bold" className="px-1 text-xl" style={{ color: c.ink }}>
      {children}
    </AppText>
  );
}

function Tile({
  icon,
  label,
  onPress,
  chevron,
  iconColor,
}: {
  icon: IconKey;
  label?: string;
  onPress: () => void;
  chevron?: boolean;
  iconColor?: string;
}) {
  const c = usePopupColors();
  return (
    <PressableScale
      scaleTo={0.97}
      onPress={onPress}
      className="flex-1 flex-row items-center gap-3 rounded-2xl px-4 py-4"
      style={{ backgroundColor: c.page }}
    >
      <Icon name={icon} size={24} tintColor={iconColor ?? c.accent} />
      {label ? (
        <AppText weight="bold" className="flex-1" style={{ color: c.accent }}>
          {label}
        </AppText>
      ) : null}
      {chevron ? (
        <Icon name="chevronLeft" size={18} tintColor={c.gold} />
      ) : null}
    </PressableScale>
  );
}

export default memo(function AyahSheet({ ayah, onClose, onPlay }: Props) {
  const { t } = useTranslation(["azkar", "common"]);
  const c = usePopupColors();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [view, setView] = useState<"main" | "until">("main");
  const [tafsirOpen, setTafsirOpen] = useState(false);
  const [tafsirLines, setTafsirLines] = useState(0);
  const [shown, setShown] = useState<AyahRef | null>(ayah);
  const bookmark = useAppSelector((s) => s.settings.quranBookmark);
  const colors = useAppSelector((s) => s.settings.ayahColors);
  const savedAyahs = useAppSelector((s) => s.settings.savedAyahs);
  const khatma = useAppSelector((s) => s.settings.khatma);

  const [mounted, setMounted] = useState(ayah !== null);
  const screenHeight = useWindowDimensions().height;
  const progress = useSharedValue(0);
  const drag = useSharedValue(0);

  useEffect(() => {
    if (ayah) {
      setShown(ayah);
      setView("main");
      setTafsirOpen(false);
      setTafsirLines(0);
      setMounted(true);
      drag.set(0);
      progress.set(withTiming(1, { duration: 280 }));
    } else {
      progress.set(
        withTiming(0, { duration: 200 }, (finished) => {
          if (finished) scheduleOnRN(setMounted, false);
        }),
      );
    }
  }, [ayah, progress]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.get() }));
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: (1 - progress.get()) * screenHeight + drag.get() },
    ],
  }));

  const dragDown = Gesture.Pan()
    .activeOffsetY(8)
    .onUpdate((e) => {
      drag.set(Math.max(0, e.translationY));
    })
    .onEnd((e) => {
      if (e.translationY > 120 || e.velocityY > 900) {
        scheduleOnRN(onClose);
      } else {
        drag.set(withTiming(0, { duration: 180 }));
      }
    });

  const tafsir = useTafsir(shown);
  if (!shown) return null;

  const surah = getSurah(shown.surah);
  const page = pageOf(shown.surah, shown.ayah);
  const key = `${shown.surah}:${shown.ayah}`;
  const color = colors[key];
  const isBookmark =
    bookmark?.surah === shown.surah && bookmark.ayah === shown.ayah;
  const isSaved = savedAyahs.includes(key);
  const wird = todayWirdBounds(khatma);
  const endsWird =
    !!wird && wird.last.surah === shown.surah && wird.last.ayah === shown.ayah;
  const label = `${surah?.name}: ${toArabicDigits(shown.ayah)}`;
  const text = ayahText(shown.surah, shown.ayah);
  const shareText = `${text}\n\n﴿${surah?.name} ${toArabicDigits(shown.ayah)}﴾`;
  const pageAyahs = ayahsOnPage(page);
  const after = pageAyahs.filter(
    (a) =>
      a.surah > shown.surah ||
      (a.surah === shown.surah && a.ayah >= shown.ayah),
  );
  const pageEnd = pageAyahs[pageAyahs.length - 1];
  const surahEnd = { surah: shown.surah, ayah: surah?.verses ?? shown.ayah };

  const playUntil = (until: AyahRef | null) => {
    onPlay(shown, until);
    onClose();
  };

  const header = (
    <View className="flex-row items-center px-1 pb-2">
      <View className="flex-1 items-start">
        {view === "until" ? (
          <PressableScale
            onPress={() => setView("main")}
            className="flex-row items-center gap-1"
          >
            <Icon name="chevronRight" size={20} tintColor={c.accent} />
            <AppText weight="bold" style={{ color: c.accent }}>
              {label}
            </AppText>
          </PressableScale>
        ) : null}
      </View>
      <AppText weight="bold" className="text-lg" style={{ color: c.ink }}>
        {view === "until" ? t("playUntil") : label}
      </AppText>
      <View className="flex-1 items-end">
        <PressableScale
          onPress={onClose}
          accessibilityLabel={t("close")}
          className="size-9 items-center justify-center rounded-full"
          style={{ backgroundColor: c.frame }}
        >
          <Icon name="close" size={16} tintColor={c.ink} />
        </PressableScale>
      </View>
    </View>
  );

  const main = (
    <View className="gap-4">
      {endsWird ? (
        <PressableScale
          scaleTo={0.98}
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            dispatch(completeWird());
            onClose();
          }}
          className="flex-row items-center justify-center gap-2 rounded-2xl py-4"
          style={{ backgroundColor: c.accent }}
        >
          <Icon name="checkCircle" size={22} tintColor="#ffffff" />
          <AppText
            weight="bold"
            className="text-base"
            style={{ color: "#ffffff" }}
          >
            {t("khatmaFinishWird")}
          </AppText>
        </PressableScale>
      ) : null}
      <SectionTitle>{t("bookmarksTitle")}</SectionTitle>
      <View className="flex-row gap-3">
        <Tile
          icon={isBookmark ? "bookmarkFill" : "bookmark"}
          label={t(isBookmark ? "removeBookmark" : "readingMark")}
          onPress={() => {
            Haptics.selectionAsync();
            dispatch(setQuranBookmark(isBookmark ? null : shown));
          }}
        />
        <Tile
          icon={isSaved ? "heartFill" : "heart"}
          label={t(isSaved ? "unsaveAyah" : "saveAyah")}
          onPress={() => {
            Haptics.selectionAsync();
            dispatch(toggleSavedAyah(key));
          }}
        />
      </View>

      <SectionTitle>{t("recitationTitle")}</SectionTitle>
      <View className="flex-row gap-3">
        <Tile icon="play" label={t("play")} onPress={() => playUntil(null)} />
        <Tile
          icon="play"
          label={t("playUntil")}
          chevron
          onPress={() => setView("until")}
        />
      </View>

      <SectionTitle>{t("tafsirTitle")}</SectionTitle>
      <View
        className="gap-3 rounded-2xl p-4"
        style={{ backgroundColor: c.page }}
      >
        {tafsir ? (
          <>
            <AppText
              arabic
              className="absolute inset-x-4 top-4 text-base leading-8"
              style={{ opacity: 0 }}
              onTextLayout={(e) => setTafsirLines(e.nativeEvent.lines.length)}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            >
              {tafsir.text}
            </AppText>
            <AppText
              arabic
              className="text-base leading-8"
              style={{ color: c.ink }}
              numberOfLines={tafsirOpen ? undefined : 5}
            >
              {tafsir.text}
            </AppText>
            <View className="flex-row items-center justify-between">
              {tafsirLines > 5 ? (
                <Pressable
                  onPress={() => setTafsirOpen((open) => !open)}
                  hitSlop={8}
                >
                  <AppText weight="bold" style={{ color: c.accent }}>
                    {t(tafsirOpen ? "seeLess" : "seeMore")}
                  </AppText>
                </Pressable>
              ) : (
                <View />
              )}
              <AppText className="text-xs" style={{ color: c.gold }}>
                {tafsir.source}
              </AppText>
            </View>
          </>
        ) : null}
      </View>

      <SectionTitle>{t("sharingTitle")}</SectionTitle>
      <View className="flex-row gap-3">
        <Tile
          icon="copy"
          label={t("common:copy")}
          onPress={async () => {
            await Clipboard.setStringAsync(shareText);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
        />
        <Tile
          icon="share"
          label={t("common:share")}
          onPress={() => Share.share({ message: shareText })}
        />
      </View>

      <SectionTitle>{t("highlightTitle")}</SectionTitle>
      <View
        className="flex-row items-center justify-between rounded-2xl px-4 py-3"
        style={{ backgroundColor: c.page }}
      >
        {[null, ...AYAH_COLORS.map((_, i) => i)].map((value) => {
          const selected =
            value === null ? color === undefined : color === value;
          return (
            <PressableScale
              key={String(value)}
              onPress={() => {
                Haptics.selectionAsync();
                dispatch(setAyahColor({ key, color: value }));
              }}
              className="size-11 items-center justify-center rounded-full"
              style={{
                borderWidth: selected ? 2.5 : 0,
                borderColor: c.accent,
              }}
            >
              <View
                className="size-9 items-center justify-center rounded-full"
                style={{
                  backgroundColor:
                    value === null ? "transparent" : AYAH_COLORS[value],
                  borderWidth: value === null ? 1.5 : 0,
                  borderColor: c.gold,
                }}
              >
                {value === null ? (
                  <Icon name="close" size={16} tintColor={c.gold} />
                ) : null}
              </View>
            </PressableScale>
          );
        })}
      </View>
    </View>
  );

  const until = (
    <View className="gap-4">
      <View
        className="overflow-hidden rounded-2xl"
        style={{ backgroundColor: c.page }}
      >
        {[
          {
            title: t("endOfPage"),
            value: t("pageNumber", { page: toArabicDigits(page) }),
            stop: pageEnd,
          },
          { title: t("endOfSurah"), value: surah?.name ?? "", stop: surahEnd },
          { title: t("continuous"), value: "∞", stop: null },
        ].map((row, i) => (
          <Pressable
            key={row.title}
            onPress={() => playUntil(row.stop)}
            className="flex-row items-center justify-between px-4 py-4"
            style={i > 0 ? { borderTopWidth: 1, borderColor: c.frame } : null}
          >
            <AppText weight="bold" style={{ color: c.ink }}>
              {row.title}
            </AppText>
            <AppText style={{ color: c.gold }}>{row.value}</AppText>
          </Pressable>
        ))}
      </View>

      <View
        className="overflow-hidden rounded-2xl"
        style={{ backgroundColor: c.page }}
      >
        {after.map((ref, i) => (
          <Pressable
            key={`${ref.surah}:${ref.ayah}`}
            onPress={() => playUntil(ref)}
            className="gap-2 px-4 py-3"
            style={i > 0 ? { borderTopWidth: 1, borderColor: c.frame } : null}
          >
            <View className="flex-row items-center justify-between">
              <AppText weight="bold" style={{ color: c.ink }}>
                {`${getSurah(ref.surah)?.name}: ${toArabicDigits(ref.ayah)}`}
              </AppText>
              <AppText style={{ color: c.gold }}>
                {toArabicDigits(page)}
              </AppText>
            </View>
            <AppText
              variant="quran"
              className="text-xl"
              style={{ color: c.gold }}
              numberOfLines={1}
            >
              {ayahText(ref.surah, ref.ayah)}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView
        style={{ flex: 1, justifyContent: "flex-end", direction: "rtl" }}
      >
        <Animated.View style={[StyleSheet.absoluteFill, backdropStyle]}>
          <Pressable
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(0,0,0,0.35)" },
            ]}
            onPress={onClose}
            accessibilityLabel={t("close")}
          />
        </Animated.View>
        <Animated.View
          className="max-h-[88%] rounded-t-3xl px-4 pt-4"
          style={[
            {
              backgroundColor: c.frameFill,
              paddingBottom: insets.bottom + 12,
            },
            sheetStyle,
          ]}
        >
          <GestureDetector gesture={dragDown}>
            <View>
              <View className="items-center pb-3">
                <View
                  className="h-1.5 w-11 rounded-full"
                  style={{ backgroundColor: c.frame }}
                />
              </View>
              {header}
            </View>
          </GestureDetector>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 12 }}
          >
            {view === "main" ? main : until}
          </ScrollView>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
});
