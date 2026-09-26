import { useEffect } from "react";
import { Platform, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useHeaderHeight } from "expo-router/react-navigation";

/**
 * Thin progress bar pinned right under the header; stays fixed while the list
 * scrolls. Fills from the reading side (right in Arabic) and animates each count.
 */
export default function TopProgressBar({
  done,
  total,
}: {
  done: number;
  total: number;
}) {
  const headerHeight = useHeaderHeight();
  // iOS draws the header over the content (transparent), elsewhere the content
  // already starts below it
  const top = Platform.OS === "ios" ? headerHeight : 0;
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
      className="absolute inset-x-0 h-1 bg-surface-muted"
      style={{ top, pointerEvents: "none" }}
    >
      <Animated.View className="h-full rounded-e-full bg-main" style={fill} />
    </View>
  );
}
