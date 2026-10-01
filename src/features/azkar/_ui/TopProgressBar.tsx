import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function TopProgressBar({
  done,
  total,
}: {
  done: number;
  total: number;
}) {
  const progress = useSharedValue(total ? done / total : 0);

  useEffect(() => {
    progress.set(
      withTiming(total ? done / total : 0, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [done, total, progress]);

  const fill = useAnimatedStyle(() => ({ width: `${progress.get() * 100}%` }));

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: total, now: done }}
      className="absolute inset-x-0 top-0 h-1 bg-surface-muted"
      style={{ pointerEvents: "none" }}
    >
      <Animated.View className="h-full rounded-e-full bg-main" style={fill} />
    </View>
  );
}
