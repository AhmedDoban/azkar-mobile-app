import AppText from "@/components/ui/AppText";
import Icon, { IconKey } from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useTabBarColors from "@/hooks/useTabBarColors";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function AndroidTabItem({
  icon,
  label,
  focused,
  onPress,
}: {
  icon: IconKey;
  label: string;
  focused: boolean;
  onPress: () => void;
}) {
  const tab = useTabBarColors();
  const color = focused ? tab.active : tab.inactive;

  const lift = useSharedValue(focused ? 1 : 0);
  useEffect(() => {
    lift.set(
      withSpring(focused ? 1 : 0, { damping: 16, stiffness: 420, mass: 0.6 }),
    );
  }, [focused, lift]);
  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -26 * lift.get() },
      { scale: 1 + 0.08 * lift.get() },
    ],
  }));
  const circleStyle = useAnimatedStyle(() => ({
    opacity: lift.get(),
    transform: [{ scale: 0.6 + 0.4 * lift.get() }],
  }));

  return (
    <PressableScale
      scaleTo={0.9}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={label}
      className="flex-1 items-center justify-center"
    >
      <Animated.View
        className="size-14 items-center justify-center"
        style={bubbleStyle}
      >
        <Animated.View
          className="rounded-full border-[6px] border-main-bg bg-surface"
          style={[StyleSheet.absoluteFill, circleStyle]}
        />
        <Icon name={icon} size={22} tintColor={color} />
      </Animated.View>
      <AppText
        weight={focused ? "bold" : "regular"}
        className="-mt-3 text-[11px]"
        style={{ color }}
        numberOfLines={1}
      >
        {label}
      </AppText>
    </PressableScale>
  );
}
