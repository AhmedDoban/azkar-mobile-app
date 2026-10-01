import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = Omit<PressableProps, "style"> & {
  className?: string;
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
};

export default function PressableScale({
  scaleTo = 0.96,
  onPressIn,
  onPressOut,
  style,
  ...props
}: Props) {
  const pressed = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - pressed.get() * 0.2,
    transform: [{ scale: 1 - pressed.get() * (1 - scaleTo) }],
  }));

  return (
    <AnimatedPressable
      {...props}
      onPressIn={(e) => {
        pressed.set(withTiming(1, { duration: 90 }));
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        pressed.set(withSpring(0, { damping: 14, stiffness: 320 }));
        onPressOut?.(e);
      }}
      style={[style, animatedStyle]}
    />
  );
}
