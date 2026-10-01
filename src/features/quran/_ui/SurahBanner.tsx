import AppText from "@/components/ui/AppText";
import { getSurah } from "@/features/azkar/_data/quran";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { BANNER_H, cartouchePath } from "../_components/bannerPaths";
import useMushafColors from "../_components/useMushafColors";
import BannerConnector from "./BannerConnector";
import BannerMedallion from "./BannerMedallion";

const MEDALLION = 19;

export default function SurahBanner({ surahId }: { surahId: number }) {
  const c = useMushafColors();
  const [width, setWidth] = useState(0);
  const surah = getSurah(surahId);
  if (!surah) return null;

  const cartoucheWidth = Math.min(width * 0.46, 180);
  const left = width / 2 - cartoucheWidth / 2;
  const right = width / 2 + cartoucheWidth / 2;
  const startMedallion = 26;
  const endMedallion = width - 26;

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
              fill={c.frameFill}
              stroke={c.gold}
              strokeWidth={1.4}
            />
            <Rect
              x={4.5}
              y={4.5}
              width={width - 9}
              height={BANNER_H - 9}
              fill="none"
              stroke={c.gold}
              strokeWidth={0.6}
            />
            <BannerConnector
              from={startMedallion + MEDALLION + 2}
              to={left - 4}
            />
            <BannerConnector
              from={right + 4}
              to={endMedallion - MEDALLION - 2}
            />
            <BannerMedallion cx={startMedallion} radius={MEDALLION} />
            <BannerMedallion cx={endMedallion} radius={MEDALLION} />
            <Path
              d={cartouchePath(left, right, 0)}
              fill={c.page}
              stroke={c.gold}
              strokeWidth={1.3}
            />
            <Path
              d={cartouchePath(left, right, 3.5)}
              fill="none"
              stroke={c.frame}
              strokeWidth={0.7}
            />
          </Svg>
          <View className="absolute inset-0 items-center justify-center">
            <AppText
              variant="quran"
              weight="bold"
              className="text-[22px]"
              style={{ color: c.ink, maxWidth: cartoucheWidth - 28 }}
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
