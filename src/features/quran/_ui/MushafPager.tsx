import { PAGE_COUNT } from "@/features/azkar/_data/quran";
import { memo, ReactNode, useEffect, useMemo } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import MushafPagerSlot from "./MushafPagerSlot";

const SWIPE = 0.22;
const FLING = 600;

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

  const gesture = useMemo(() => {
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

    return Gesture.Race(pan, Gesture.Exclusive(longPress, tap));
  }, [base, offset, width, onChange, onTap, onLongPress]);

  const slots = [page - 1, page, page + 1].filter(
    (p) => p >= 1 && p <= PAGE_COUNT,
  );

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ width, height, overflow: "hidden", direction: "ltr" }}>
        {slots.map((p) => (
          <MushafPagerSlot
            key={p}
            page={p}
            base={base}
            offset={offset}
            width={width}
            height={height}
          >
            {renderPage(p)}
          </MushafPagerSlot>
        ))}
      </View>
    </GestureDetector>
  );
});
