import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from "react-native-svg";
import { AdhanPalette } from "./palette";

export default function Lantern({
  palette: p,
  left,
  right,
  length,
  size = 1,
  delay = 0,
}: {
  palette: AdhanPalette;
  left?: number;
  right?: number;
  length: number;
  size?: number;
  delay?: number;
}) {
  const swing = useSharedValue(-1);

  useEffect(() => {
    swing.set(
      withRepeat(
        withTiming(1, {
          duration: 2600 + delay,
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true,
      ),
    );
  }, [delay, swing]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${swing.get() * 3}deg` }],
  }));

  const w = 34 * size;
  const bodyTop = length;
  const h = length + 64 * size;

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left,
          right,
          width: w,
          height: h,
          transformOrigin: "top",
        },
        style,
      ]}
    >
      <Svg width={w} height={h} viewBox={`0 0 34 ${h / size}`}>
        <Defs>
          <LinearGradient id="lantern" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={p.lanternBottom} />
            <Stop offset="0.45" stopColor={p.lanternTop} />
            <Stop offset="1" stopColor={p.lanternBottom} />
          </LinearGradient>
        </Defs>
        {(() => {
          const top = bodyTop / size;
          return (
            <>
              <Rect
                x="16.4"
                y="0"
                width="1.2"
                height={top}
                fill={p.lanternTop}
                opacity="0.7"
              />
              <Path
                d={`M 11 ${top + 8} L 17 ${top} L 23 ${top + 8} Z`}
                fill="url(#lantern)"
              />
              <Rect
                x="8"
                y={top + 8}
                width="18"
                height="4"
                rx="2"
                fill="url(#lantern)"
              />
              <Rect
                x="7"
                y={top + 12}
                width="20"
                height="34"
                rx="9"
                fill="url(#lantern)"
              />
              <Rect
                x="12"
                y={top + 17}
                width="10"
                height="24"
                rx="5"
                fill={p.lanternWindow}
              />
              <Rect
                x="15.5"
                y={top + 20}
                width="3"
                height="18"
                rx="1.5"
                fill={p.mint}
                opacity="0.55"
              />
              <Rect
                x="9"
                y={top + 46}
                width="16"
                height="4"
                rx="2"
                fill="url(#lantern)"
              />
              <Path
                d={`M 13 ${top + 50} L 17 ${top + 60} L 21 ${top + 50} Z`}
                fill="url(#lantern)"
              />
            </>
          );
        })()}
      </Svg>
    </Animated.View>
  );
}
