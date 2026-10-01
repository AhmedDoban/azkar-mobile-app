import Screen from "@/components/ui/Screen";
import useTabBarSpace from "@/hooks/useTabBarSpace";
import { PropsWithChildren, useState } from "react";
import { View } from "react-native";
import CompactHeroBar from "./CompactHeroBar";
import PageHero, { HERO_HEIGHT, PageHeroProps } from "./PageHero";

const COMPACT_AT = 90;

export default function HeroScreen({
  hero,
  children,
}: PropsWithChildren<{ hero: PageHeroProps }>) {
  const tabBarSpace = useTabBarSpace();
  const threshold = (hero.height ?? HERO_HEIGHT) - COMPACT_AT;
  const [compact, setCompact] = useState(false);

  return (
    <View className="flex-1 bg-main-bg">
      <Screen
        className="gap-0 px-0 pt-0"
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{ paddingBottom: 12 + tabBarSpace }}
        scrollIndicatorInsets={{ bottom: tabBarSpace }}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const next = e.nativeEvent.contentOffset.y > threshold;
          if (next !== compact) setCompact(next);
        }}
      >
        <PageHero {...hero} />
        <View className="gap-6 px-4 pt-2">{children}</View>
      </Screen>
      <CompactHeroBar hero={hero} visible={compact} />
    </View>
  );
}
