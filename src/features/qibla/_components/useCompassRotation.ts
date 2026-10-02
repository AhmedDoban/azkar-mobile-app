import {
  Easing,
  type SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const TIMING = { duration: 180, easing: Easing.out(Easing.quad) };

export default function useCompassRotation(
  heading: SharedValue<number>,
  base: number,
) {
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
