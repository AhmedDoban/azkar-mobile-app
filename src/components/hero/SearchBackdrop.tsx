import { type StyleProp, type ViewStyle } from "react-native";
import Animated, { type AnimatedStyle } from "react-native-reanimated";

const FILL = {
  backgroundColor: "rgba(255, 255, 255, 0.18)",
  borderColor: "rgba(255, 255, 255, 0.3)",
  borderWidth: 1,
};

export default function SearchBackdrop({
  size,
  style,
}: {
  size: number;
  style: StyleProp<AnimatedStyle<ViewStyle>>;
}) {
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          end: 0,
          height: size,
          borderRadius: size / 2,
          pointerEvents: "none",
        },
        FILL,
        style,
      ]}
    />
  );
}
