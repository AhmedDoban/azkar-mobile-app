import { PAGE_COUNT } from "@/features/azkar/_data/quran";
import { memo, ReactNode, useEffect } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const SWIPE = 0.22;
const FLING = 600;

function Slot({
  page,
  base,
  offset,
  width,
  height,
  children,
}: {
  page: number;
  base: SharedValue<number>;
  offset: SharedValue<number>;
  width: number;
  height: number;
  children: ReactNode;
}) {
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: (base.get() - page) * width + offset.get() }],
  }));

  return (
    <Animated.View
      style={[{ position: "absolute", top: 0, left: 0, width, height }, style]}
    >
      {children}
    </Animated.View>
  );
}

export default memo(function MushafPager({
  page,
  width,
  height,
  onChange,
  onTap,
  onLongPress,
  renderPage,
}: {
  page: number;
  width: number;
  height: number;
  onChange: (page: number) => void;
  onTap: () => void;
  onLongPress: (x: number, y: number) => void;
  renderPage: (page: number) => ReactNode;
}) {
  const base = useSharedValue(page);
  const offset = useSharedValue(0);

  useEffect(() => {
    if (base.get() !== page) {
      base.set(page);
      offset.set(0);
    }
  }, [page, base, offset]);

  const pan = Gesture.Pan()
    .activeOffsetX([-16, 16])
    .failOffsetY([-14, 14])
    .onUpdate((e) => {
      const current = base.get();
      const edge =
        (current <= 1 && e.translationX < 0) ||
        (current >= PAGE_COUNT && e.translationX > 0);
      offset.set(edge ? e.translationX / 4 : e.translationX);
    })
    .onEnd((e) => {
      const current = base.get();
      let next = current;
      if (e.translationX > width * SWIPE || e.velocityX > FLING) next += 1;
      else if (e.translationX < -width * SWIPE || e.velocityX < -FLING) {
        next -= 1;
      }
      if (next === current || next < 1 || next > PAGE_COUNT) {
        offset.set(withTiming(0, { duration: 180 }));
        return;
      }
      const target = next > current ? width : -width;
      offset.set(
        withTiming(target, { duration: 220 }, (finished) => {
          if (!finished) return;
          base.set(next);
          offset.set(0);
          scheduleOnRN(onChange, next);
        }),
      );
    });

  const tap = Gesture.Tap()
    .maxDuration(250)
    .onEnd((_e, success) => {
      if (success) scheduleOnRN(onTap);
    });

  const longPress = Gesture.LongPress()
    .minDuration(450)
    .onStart((e) => {
      scheduleOnRN(onLongPress, e.x, e.y);
    });

  const gesture = Gesture.Race(pan, Gesture.Exclusive(longPress, tap));

  const slots = [page - 1, page, page + 1].filter(
    (p) => p >= 1 && p <= PAGE_COUNT,
  );

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ width, height, overflow: "hidden", direction: "ltr" }}>
        {slots.map((p) => (
          <Slot
            key={p}
            page={p}
            base={base}
            offset={offset}
            width={width}
            height={height}
          >
            {renderPage(p)}
          </Slot>
        ))}
      </View>
    </GestureDetector>
  );
});
