import useDirection from "@/hooks/useDirection";
import useTabBarSpace from "@/hooks/useTabBarSpace";
import { PropsWithChildren, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import CompactHeroBar from "./CompactHeroBar";
import PageHero, { HERO_HEIGHT, PageHeroProps } from "./PageHero";

const COMPACT_AT = 90;

export default function HeroScreen({
  hero,
  children,
}: PropsWithChildren<{ hero: PageHeroProps }>) {
  const tabBarSpace = useTabBarSpace();
  const { direction } = useDirection();
  const threshold = (hero.height ?? HERO_HEIGHT) - COMPACT_AT;
  const [compact, setCompact] = useState(false);
  const compactValue = useSharedValue(false);

  const onScroll = useAnimatedScrollHandler(
    {
      onScroll: (e) => {
        const next = e.contentOffset.y > threshold;
        if (next !== compactValue.get()) {
          compactValue.set(next);
          scheduleOnRN(setCompact, next);
        }
      },
    },
    [threshold],
  );

  return (
    <View className="flex-1 bg-main-bg">
      <Animated.ScrollView
        className="flex-1 bg-main-bg"
        style={{ direction }}
        contentContainerStyle={{ paddingBottom: 12 + tabBarSpace }}
        contentInsetAdjustmentBehavior="never"
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        scrollIndicatorInsets={{ bottom: tabBarSpace }}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        <PageHero {...hero} />
        <View className="gap-6 px-4 pt-2">{children}</View>
      </Animated.ScrollView>
      <CompactHeroBar hero={hero} visible={compact} />
    </View>
  );
}
