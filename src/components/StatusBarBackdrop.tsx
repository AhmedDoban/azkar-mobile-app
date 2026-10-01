import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StatusBarBackdrop({ visible }: { visible: boolean }) {
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    opacity.set(withTiming(visible ? 1 : 0, { duration: 180 }));
  }, [visible, opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.get() }));

  return (
    <Animated.View
      className="absolute inset-x-0 top-0 bg-main-bg"
      style={[{ height: insets.top, pointerEvents: "none" }, style]}
    />
  );
}
