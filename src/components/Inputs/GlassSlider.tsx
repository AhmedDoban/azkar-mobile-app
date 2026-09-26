import { useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import * as Haptics from "expo-haptics";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import useThemeColors from "@/hooks/useThemeColors";

const THUMB_W = 38;
const THUMB_H = 26;
const TRACK_H = 8;
const hasGlass = isLiquidGlassAvailable();

type Props = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  /** Fill from the right (Arabic) */
  rtl?: boolean;
  accessibilityLabel?: string;
};

/**
 * Range slider with a glass thumb: a real Liquid Glass lens on iOS 26+, a
 * frosted pill elsewhere. Snaps to `step` and ticks with a haptic per step.
 */
export default function GlassSlider({
  value,
  min,
  max,
  step,
  onChange,
  rtl = false,
  accessibilityLabel,
}: Props) {
  const colors = useThemeColors();
  const width = useSharedValue(0);
  const progress = useSharedValue((value - min) / (max - min));
  const lastValue = useSharedValue(value);
  const pressed = useSharedValue(0);

  // Follow outside changes (hydration, accessibility actions) when not dragging
  useEffect(() => {
    if (pressed.get()) return;
    lastValue.set(value);
    progress.set(withSpring((value - min) / (max - min), { damping: 18 }));
  }, [value, min, max, pressed, lastValue, progress]);

  const emit = (next: number) => {
    Haptics.selectionAsync();
    onChange(next);
  };

  const update = (x: number) => {
    "worklet";
    const usable = Math.max(width.get() - THUMB_W, 1);
    let p = Math.min(1, Math.max(0, (x - THUMB_W / 2) / usable));
    if (rtl) p = 1 - p;
    progress.set(p);
    const stepped = min + Math.round((p * (max - min)) / step) * step;
    if (stepped !== lastValue.get()) {
      lastValue.set(stepped);
      scheduleOnRN(emit, stepped);
    }
  };

  const pan = Gesture.Pan()
    .minDistance(0)
    .onBegin((e) => {
      pressed.set(withSpring(1, { damping: 14 }));
      update(e.x);
    })
    .onUpdate((e) => update(e.x))
    .onFinalize(() => {
      pressed.set(withSpring(0, { damping: 14 }));
      // Settle exactly on the chosen step
      progress.set(
        withSpring((lastValue.get() - min) / (max - min), {
          damping: 18,
        }),
      );
    });

  // The track width also lives in state: the animated styles list it as a
  // dependency, so they recompute once the slider is measured (otherwise the
  // thumb stayed at 0 until the first drag)
  const [trackWidth, setTrackWidth] = useState(0);
  const usable = Math.max(trackWidth - THUMB_W, 0);

  // Physical x of the thumb's left edge (the slider lays out left-to-right)
  const thumbStyle = useAnimatedStyle(() => {
    const x = (rtl ? 1 - progress.get() : progress.get()) * usable;
    return {
      transform: [{ translateX: x }, { scale: 1 + pressed.get() * 0.18 }],
    };
  }, [usable, rtl]);

  const fillStyle = useAnimatedStyle(() => {
    const center =
      (rtl ? 1 - progress.get() : progress.get()) * usable + THUMB_W / 2;
    return rtl ? { left: center, right: 0 } : { left: 0, width: center };
  }, [usable, rtl]);

  const onLayout = (e: LayoutChangeEvent) => {
    width.set(e.nativeEvent.layout.width);
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const nudge = (dir: 1 | -1) => {
    const next = Math.min(max, Math.max(min, value + dir * step));
    if (next !== value) emit(next);
  };

  return (
    <GestureDetector gesture={pan}>
      <View
        onLayout={onLayout}
        // Own left-to-right coordinate space; RTL is handled by flipping progress
        style={{
          direction: "ltr",
          height: THUMB_H + 16,
          justifyContent: "center",
        }}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{ min, max, now: value }}
        accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
        onAccessibilityAction={(e) =>
          nudge(e.nativeEvent.actionName === "increment" ? 1 : -1)
        }
      >
        {/* Track */}
        <View
          className="overflow-hidden rounded-full border border-line bg-surface-muted"
          style={{
            height: TRACK_H,
            marginHorizontal: THUMB_W / 2 - TRACK_H / 2,
          }}
        >
          <Animated.View
            className="absolute bottom-0 top-0 rounded-full bg-main"
            style={fillStyle}
          />
        </View>

        {/* Glass thumb */}
        <Animated.View
          style={[
            styles.thumb,
            {
              shadowColor: "#000",
              shadowOpacity: colors.isDark ? 0.4 : 0.18,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 4,
            },
            thumbStyle,
          ]}
        >
          {/* Inner clip keeps the rounded glass while the outer view keeps its shadow */}
          <View
            style={[
              StyleSheet.absoluteFill,
              { borderRadius: THUMB_H / 2, overflow: "hidden" },
            ]}
          >
            {hasGlass ? (
              <GlassView
                style={StyleSheet.absoluteFill}
                glassEffectStyle="clear"
                isInteractive
                colorScheme={colors.isDark ? "dark" : "light"}
              />
            ) : (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: colors.isDark
                      ? "rgba(255,255,255,0.22)"
                      : "rgba(255,255,255,0.92)",
                    borderWidth: 1,
                    borderColor: colors.isDark
                      ? "rgba(255,255,255,0.35)"
                      : colors.line,
                    borderRadius: THUMB_H / 2,
                  },
                ]}
              />
            )}
            {/* Sheen along the top edge, like light on glass */}
            <View
              style={{
                position: "absolute",
                top: 2,
                left: 6,
                right: 6,
                height: THUMB_H / 2 - 2,
                borderRadius: THUMB_H / 2,
                backgroundColor: "rgba(255,255,255,0.35)",
              }}
            />
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  thumb: {
    position: "absolute",
    left: 0,
    width: THUMB_W,
    height: THUMB_H,
    borderRadius: THUMB_H / 2,
  },
});
