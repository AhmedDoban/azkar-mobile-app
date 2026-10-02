import { ReactNode } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function MushafPagerSlot({
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
