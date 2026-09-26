import AppText from "@/components/ui/AppText";
import PressableScale from "@/components/ui/PressableScale";
import useTabBarColors from "@/hooks/useTabBarColors";
import * as Haptics from "expo-haptics";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { SymbolView } from "expo-symbols";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type TabDef = {
  name: string;
  label: string;
  md: string;
};

/**
 * Android bottom bar: a floating card where the selected tab's icon rises
 * into a circle above the bar. The circle's thick border has the page color,
 * so it looks cut out of the bar. (iOS keeps the native Liquid Glass tabs.)
 */
export default function AndroidTabBar({
  state,
  navigation,
  tabs,
}: BottomTabBarProps & { tabs: readonly TabDef[] }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-main-bg px-3 pt-2"
      style={{ paddingBottom: insets.bottom + 8 }}
    >
      <View
        className="h-[68px] flex-row rounded-3xl border border-line bg-surface"
        style={{ boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)" }}
      >
        {state.routes.map((route, index) => {
          const tab = tabs.find((t) => t.name === route.name);
          if (!tab) return null;
          const focused = state.index === index;

          return (
            <TabItem
              key={route.key}
              icon={tab.md}
              label={t(tab.label as never)}
              focused={focused}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) {
                  Haptics.selectionAsync();
                  navigation.navigate(route.name, route.params);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

function TabItem({
  icon,
  label,
  focused,
  onPress,
}: {
  icon: string;
  label: string;
  focused: boolean;
  onPress: () => void;
}) {
  const tab = useTabBarColors();
  const color = focused ? tab.active : tab.inactive;

  const lift = useSharedValue(focused ? 1 : 0);
  useEffect(() => {
    // Stiff and light: snaps up in ~200ms with a small overshoot
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
        <SymbolView
          name={{ ios: "circle", android: icon, web: icon } as never}
          size={24}
          tintColor={color}
        />
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
