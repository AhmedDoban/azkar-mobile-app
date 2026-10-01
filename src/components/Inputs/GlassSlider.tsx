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
  rtl?: boolean;
  accessibilityLabel?: string;
};

const DARK_FILL = "#2f8f72";

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
      progress.set(
        withSpring((lastValue.get() - min) / (max - min), {
          damping: 18,
        }),
      );
    });

  const [trackWidth, setTrackWidth] = useState(0);
  const usable = Math.max(trackWidth - THUMB_W, 0);

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
        <View
          className="overflow-hidden rounded-full border border-line bg-surface-muted"
          style={[
            {
              height: TRACK_H,
              marginHorizontal: THUMB_W / 2 - TRACK_H / 2,
            },
            colors.isDark && {
              backgroundColor: "#2a2a2a",
              borderColor: "#2a2a2a",
            },
          ]}
        >
          <Animated.View
            className="absolute bottom-0 top-0 rounded-full bg-accent"
            style={[fillStyle, colors.isDark && { backgroundColor: DARK_FILL }]}
          />
        </View>

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
                tintColor={colors.isDark ? "#ffffff" : undefined}
              />
            ) : (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: colors.isDark
                      ? "#ffffff"
                      : "rgba(255,255,255,0.92)",
                    borderWidth: colors.isDark ? 2 : 1,
                    borderColor: colors.isDark ? DARK_FILL : colors.line,
                    borderRadius: THUMB_H / 2,
                  },
                ]}
              />
            )}
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
