import useDirection from "@/hooks/useDirection";
import useThemeColors from "@/hooks/useThemeColors";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  type SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Line, Path, Text } from "react-native-svg";

const TICKS = Array.from({ length: 60 }, (_, i) => i * 6);
const TIMING = { duration: 180, easing: Easing.out(Easing.quad) };

function useRotation(heading: SharedValue<number>, base: number) {
  const rotation = useSharedValue(base);
  const last = useSharedValue(base);
  useAnimatedReaction(
    () => base - heading.get(),
    (target) => {
      const delta = (((target - last.get()) % 360) + 360) % 360;
      const next = last.get() + (delta > 180 ? delta - 360 : delta);
      last.set(next);
      rotation.set(withTiming(next, TIMING));
    },
    [base],
  );
  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.get()}deg` }],
  }));
}

const Dial = memo(function Dial({
  size,
  aligned,
  main,
  line,
  gray,
  font,
  north,
  east,
  south,
  west,
}: {
  size: number;
  aligned: boolean;
  main: string;
  line: string;
  gray: string;
  font: string;
  north: string;
  east: string;
  south: string;
  west: string;
}) {
  const c = size / 2;
  const ring = c - 34;
  const point = (angle: number, radius: number) => ({
    x: c + radius * Math.sin((angle * Math.PI) / 180),
    y: c - radius * Math.cos((angle * Math.PI) / 180),
  });
  const cardinals = [
    { angle: 0, label: north },
    { angle: 90, label: east },
    { angle: 180, label: south },
    { angle: 270, label: west },
  ];

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={c}
        cy={c}
        r={ring}
        fill="none"
        stroke={aligned ? main : line}
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
            stroke={major ? main : gray}
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
            fill={angle === 0 ? main : gray}
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
  );
});

function Compass({
  size,
  heading,
  bearing,
  aligned,
}: {
  size: number;
  heading: SharedValue<number>;
  bearing: number;
  aligned: boolean;
}) {
  const { t } = useTranslation("qibla");
  const colors = useThemeColors();
  const { isRTL } = useDirection();
  const font = isRTL ? "LamaSans" : "SpaceGrotesk";

  const dialStyle = useRotation(heading, 0);
  const arrowStyle = useRotation(heading, bearing);

  const arrow = size * 0.16;

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={[StyleSheet.absoluteFill, dialStyle]}>
        <Dial
          size={size}
          aligned={aligned}
          main={colors.main}
          line={colors.line}
          gray={colors.gray}
          font={font}
          north={t("north")}
          east={t("east")}
          south={t("south")}
          west={t("west")}
        />
      </Animated.View>

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

export default memo(Compass);
