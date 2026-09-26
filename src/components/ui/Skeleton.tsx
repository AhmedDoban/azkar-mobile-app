import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

/**
 * Pulsing placeholder block. Compose these into the shape of the card that is
 * loading; pass size and rounding through className.
 */
export default function Skeleton({ className }: { className?: string }) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.set(
      withRepeat(
        withTiming(1, { duration: 850, easing: Easing.inOut(Easing.quad) }),
        -1,
        true,
      ),
    );
  }, [pulse]);

  const style = useAnimatedStyle(() => ({
    opacity: 0.45 + pulse.get() * 0.55,
  }));

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={cn("rounded-lg bg-surface-muted", className)}
      style={style}
    />
  );
}
