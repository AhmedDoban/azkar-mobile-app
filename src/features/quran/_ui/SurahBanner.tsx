import AppText from "@/components/ui/AppText";
import { getSurah } from "@/features/azkar/_data/quran";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { BANNER_H, scrolls } from "../_components/bannerShapes";
import useMushafColors from "../_components/useMushafColors";
import BannerMedallion from "./BannerMedallion";

const CAPSULE_H = BANNER_H - 24;
const MEDALLION_INSET = 29;

export default function SurahBanner({ surahId }: { surahId: number }) {
  const c = useMushafColors();
  const [width, setWidth] = useState(0);
  const surah = getSurah(surahId);
  if (!surah) return null;

  const capsuleWidth = Math.min(width * 0.42, 170);
  const left = (width - capsuleWidth) / 2;
  const right = left + capsuleWidth;
  const sideStart = MEDALLION_INSET + 23;

  return (
    <View
      className="flex-1"
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {width > 0 ? (
        <>
          <Svg width={width} height={BANNER_H} style={StyleSheet.absoluteFill}>
            <Rect
              x={1}
              y={1}
              width={width - 2}
              height={BANNER_H - 2}
              rx={3}
              fill={c.frameFill}
              stroke={c.gold}
              strokeWidth={1.6}
            />
            <Rect
              x={4}
              y={4}
              width={width - 8}
              height={BANNER_H - 8}
              rx={2}
              fill="none"
              stroke={c.gold}
              strokeWidth={0.6}
            />
            <Path
              d={`${scrolls(sideStart, left - 8)} ${scrolls(right + 14, width - sideStart)}`}
              fill="none"
              stroke={c.gold}
              strokeWidth={0.8}
            />
            <BannerMedallion cx={MEDALLION_INSET} />
            <BannerMedallion cx={width - MEDALLION_INSET} />
            <Rect
              x={left}
              y={12}
              width={capsuleWidth}
              height={CAPSULE_H}
              rx={CAPSULE_H / 2}
              fill={c.page}
              stroke={c.gold}
              strokeWidth={1.3}
            />
            <Rect
              x={left + 3.5}
              y={15.5}
              width={capsuleWidth - 7}
              height={CAPSULE_H - 7}
              rx={(CAPSULE_H - 7) / 2}
              fill="none"
              stroke={c.frame}
              strokeWidth={0.7}
            />
          </Svg>
          <View className="absolute inset-0 items-center justify-center">
            <AppText
              variant="quran"
              weight="bold"
              className="text-[20px]"
              style={{ color: c.ink, maxWidth: capsuleWidth - 24 }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {`سُورَةُ ${surah.name}`}
            </AppText>
          </View>
        </>
      ) : null}
    </View>
  );
}
