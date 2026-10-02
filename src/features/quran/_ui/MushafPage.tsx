import AppText from "@/components/ui/AppText";
import {
  AyahRef,
  getPage,
  getSurah,
  pageOf,
  toArabicDigits,
} from "@/features/azkar/_data/quran";
import { memo, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Pressable, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { PAGE } from "../_components/pageLayout";
import useMushafColors from "../_components/useMushafColors";
import { useAppSelector } from "@/store/Store";
import Icon from "@/components/ui/Icon";
import { AYAH_COLORS } from "./AyahSheet";
import { todayWirdBounds } from "../_data/khatma";
import { registerHitTest } from "../_components/pageHitTest";
import usePageSvg, { paintMarkers } from "../_components/usePageSvg";
import SurahFrame from "./SurahFrame";

export default memo(function MushafPage({
  page,
  width,
  height,
  active,
}: {
  page: number;
  width: number;
  height: number;
  active: AyahRef | null;
}) {
  const { t } = useTranslation("azkar");
  const c = useMushafColors();
  const info = getPage(page);
  const firstSurah = getSurah(info.start.surah);
  const { svg, failed, retry } = usePageSvg(page);
  const content = useMemo(
    () => (svg ? paintMarkers(svg.content, c.accent) : null),
    [svg, c.accent],
  );
  const saved = useAppSelector((s) => s.settings.ayahColors);
  const bookmark = useAppSelector((s) => s.settings.quranBookmark);
  const khatma = useAppSelector((s) => s.settings.khatma);
  const wird = useMemo(() => todayWirdBounds(khatma), [khatma]);
  const isWirdEdge = (surah: number, ayah: number) =>
    !!wird &&
    ((wird.first.surah === surah && wird.first.ayah === ayah) ||
      (wird.last.surah === surah && wird.last.ayah === ayah));

  const bookmarked = bookmark
    ? pageOf(bookmark.surah, bookmark.ayah) === page
    : false;

  const areaW = width - PAGE.paddingX * 2;
  const areaH =
    height - PAGE.paddingTop - PAGE.paddingBottom - PAGE.topRow - PAGE.gap;

  useEffect(() => {
    if (!svg) return;
    const [, , vbW, vbH] = svg.viewBox.split(/\s+/).map(Number);
    const offX = PAGE.paddingX;
    const offY = PAGE.paddingTop + PAGE.topRow + PAGE.gap;
    const stretch = page > 2;
    const s = Math.min(areaW / vbW, areaH / vbH);
    const ox = stretch ? offX : offX + (areaW - vbW * s) / 2;
    const oy = stretch ? offY : offY + (areaH - vbH * s) / 2;
    const sx = stretch ? areaW / vbW : s;
    const sy = stretch ? areaH / vbH : s;
    return registerHitTest(page, (x, y) => {
      const vx = (x - ox) / sx;
      const vy = (y - oy) / sy;
      const hit = svg.hits.find(({ boxes }) =>
        boxes.some(
          ([x0, y0, x1, y1]) => vx >= x0 && vx <= x1 && vy >= y0 && vy <= y1,
        ),
      );
      return hit ? { surah: hit.surah, ayah: hit.ayah } : null;
    });
  }, [svg, page, areaW, areaH]);

  return (
    <View
      style={{
        width,
        height,
        direction: "rtl",
        backgroundColor: c.page,
        paddingHorizontal: PAGE.paddingX,
        paddingTop: PAGE.paddingTop,
        paddingBottom: PAGE.paddingBottom,
      }}
    >
      <View
        className="flex-row items-center justify-between"
        style={{ height: PAGE.topRow, marginBottom: PAGE.gap }}
      >
        <AppText arabic className="text-xs" style={{ color: c.gold }}>
          {`الجزء ${toArabicDigits(info.juz)}`}
        </AppText>
        <AppText variant="quran" className="text-sm" style={{ color: c.gold }}>
          {firstSurah ? `سورة ${firstSurah.name}` : ""}
        </AppText>
      </View>

      {bookmarked ? (
        <View
          pointerEvents="none"
          className="absolute inset-x-0 items-center"
          style={{ top: 0 }}
        >
          <Icon name="bookmarkFill" size={30} tintColor={c.accent} />
        </View>
      ) : null}

      <View
        style={{ width: areaW, height: areaH }}
        className="items-center justify-center"
      >
        {svg ? (
          <Svg
            width={areaW}
            height={areaH}
            viewBox={svg.viewBox}
            preserveAspectRatio={page <= 2 ? "xMidYMid meet" : "none"}
          >
            {svg.ayahs.map((shape, i) => {
              const color = saved[`${shape.surah}:${shape.ayah}`];
              return color !== undefined ? (
                <Path
                  key={`c${i}`}
                  d={shape.d}
                  fill={AYAH_COLORS[color]}
                  fillOpacity={0.45}
                />
              ) : null;
            })}
            {svg.ayahs.map((shape, i) =>
              isWirdEdge(shape.surah, shape.ayah) ? (
                <Path
                  key={`w${i}`}
                  d={shape.d}
                  fill={c.gold}
                  fillOpacity={0.22}
                />
              ) : null,
            )}
            {svg.ayahs.map((shape, i) =>
              bookmark?.surah === shape.surah &&
              bookmark.ayah === shape.ayah ? (
                <Path
                  key={`b${i}`}
                  d={shape.d}
                  fill={c.accent}
                  fillOpacity={0.12}
                />
              ) : null,
            )}
            {svg.ayahs.map((shape, i) =>
              active?.surah === shape.surah && active.ayah === shape.ayah ? (
                <Path key={`h${i}`} d={shape.d} fill={c.highlight} />
              ) : null,
            )}
            {svg.titles.map((title, i) => (
              <SurahFrame key={`f${i}`} {...title} />
            ))}
            <G color={c.ink}>{content}</G>
          </Svg>
        ) : failed ? (
          <Pressable
            onPress={retry}
            className="items-center gap-2 rounded-2xl px-5 py-3"
            style={{ backgroundColor: c.frameFill }}
          >
            <AppText weight="bold" style={{ color: c.accent }}>
              {t("retry")}
            </AppText>
          </Pressable>
        ) : (
          <ActivityIndicator color={c.gold} />
        )}
      </View>
    </View>
  );
});
