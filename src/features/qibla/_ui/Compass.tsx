import useDirection from "@/hooks/useDirection";
import useThemeColors from "@/hooks/useThemeColors";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Line, Path, Text } from "react-native-svg";
import { normalize180 } from "../_data/qibla";

const TICKS = Array.from({ length: 60 }, (_, i) => i * 6);

/**
 * Animated rotation toward `target`, always taking the short way round
 * (a 359° → 1° step turns 2°, not a full spin back)
 */
function useRotation(target: number) {
  const rotation = useSharedValue(target);
  const last = useRef(target);
  useEffect(() => {
    const next = last.current + normalize180(target - last.current);
    last.current = next;
    rotation.set(
      withTiming(next, { duration: 180, easing: Easing.out(Easing.quad) }),
    );
  }, [target, rotation]);
  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.get()}deg` }],
  }));
}

/**
 * Thin compass ring with the cardinal letters outside it; the ring turns with
 * the phone so the letters stay on real north. The arrow in the middle points
 * at the qibla: straight up (at the Kaaba above) means you're facing it.
 */
export default function Compass({
  size,
  heading,
  bearing,
  aligned,
}: {
  size: number;
  /** Degrees from north the phone points at; null = no compass, dial stays north-up */
  heading: number | null;
  bearing: number;
  aligned: boolean;
}) {
  const { t } = useTranslation("qibla");
  const colors = useThemeColors();
  const { isRTL } = useDirection();
  const font = isRTL ? "LamaSans" : "SpaceGrotesk";

  const dialStyle = useRotation(-(heading ?? 0));
  const arrowStyle = useRotation(bearing - (heading ?? 0));

  const c = size / 2;
  const ring = c - 34; // leaves room for the letters outside
  const point = (angle: number, radius: number) => ({
    x: c + radius * Math.sin((angle * Math.PI) / 180),
    y: c - radius * Math.cos((angle * Math.PI) / 180),
  });
  const cardinals = [
    { angle: 0, label: t("north") },
    { angle: 90, label: t("east") },
    { angle: 180, label: t("south") },
    { angle: 270, label: t("west") },
  ];
  const arrow = size * 0.16;

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={[StyleSheet.absoluteFill, dialStyle]}>
        <Svg width={size} height={size}>
          <Circle
            cx={c}
            cy={c}
            r={ring}
            fill="none"
            stroke={aligned ? colors.main : colors.line}
            strokeWidth={aligned ? 2 : 1.5}
          />
          {TICKS.map((angle) => {
            const major = angle % 90 === 0;
            const from = point(angle, ring - 6);
            const to = point(angle, ring - (major ? 16 : 11));
            return (
              <Line
                key={angle}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={major ? colors.main : colors.gray}
                strokeOpacity={major ? 1 : 0.35}
                strokeWidth={major ? 2 : 1}
                strokeLinecap="round"
              />
            );
          })}
          {cardinals.map(({ angle, label }) => {
            const p = point(angle, ring + 20);
            return (
              <Text
                key={angle}
                x={p.x}
                y={p.y + 5}
                fill={angle === 0 ? colors.main : colors.gray}
                fontSize={14}
                fontFamily={font}
                textAnchor="middle"
                rotation={angle}
                origin={`${p.x}, ${p.y}`}
              >
                {label}
              </Text>
            );
          })}
        </Svg>
      </Animated.View>

      {/* The qibla arrow */}
      <Animated.View
        style={[StyleSheet.absoluteFill, arrowStyle]}
        className="items-center justify-center"
      >
        <Svg width={arrow * 2} height={arrow * 2} viewBox="-20 -20 40 40">
          <Path
            d="M 0 -18 L 13 14 L 0 7 L -13 14 Z"
            fill={aligned ? colors.mainFill : colors.main}
            fillOpacity={aligned ? 1 : 0.85}
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}
