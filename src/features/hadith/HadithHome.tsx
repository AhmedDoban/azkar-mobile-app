import CompactHeroBar from "@/components/hero/CompactHeroBar";
import PageHero, { PageHeroProps } from "@/components/hero/PageHero";
import AppText from "@/components/ui/AppText";
import SectionTitle from "@/components/ui/SectionTitle";
import { PAGE_MOSQUES } from "@/constants/mosques";
import useDirection from "@/hooks/useDirection";
import useTabBarSpace from "@/hooks/useTabBarSpace";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListRenderItem, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import HadithSearchResults from "./_components/HadithSearchResults";
import { hadiths, LocalHadith } from "./_data";
import HadithCardSkeleton from "./_ui/HadithCardSkeleton";
import DailyHadithCard from "./_ui/DailyHadithCard";
import LocalHadithCard from "./_ui/LocalHadithCard";

const HERO = 220;
const COMPACT_AT = 90;
const BATCH = 10;

const renderHadith: ListRenderItem<LocalHadith> = ({ item }) => (
  <View className="px-4">
    <LocalHadithCard hadith={item} />
  </View>
);

const keyExtractor = (item: LocalHadith) => item.id;

const NONE: LocalHadith[] = [];

const FOOTER = (
  <View className="px-4">
    <HadithCardSkeleton />
  </View>
);

export default function HadithHome() {
  const { t } = useTranslation(["common", "hadith"]);
  const { direction } = useDirection();
  const tabBarSpace = useTabBarSpace();
  const [compact, setCompact] = useState(false);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const searching = query.length > 0;
  const [count, setCount] = useState(BATCH);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hasMore = count < hadiths.length;
  const visible = useMemo(() => hadiths.slice(0, count), [count]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    timer.current = setTimeout(() => {
      setCount((c) => Math.min(c + BATCH, hadiths.length));
      setLoading(false);
    }, 400);
  }, [loading, hasMore]);

  const compactValue = useSharedValue(false);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      const next = e.contentOffset.y > HERO - COMPACT_AT;
      if (next !== compactValue.get()) {
        compactValue.set(next);
        scheduleOnRN(setCompact, next);
      }
    },
  });

  const onChangeText = useCallback((text: string) => {
    setDraft(text);
    if (!text.trim()) setQuery("");
  }, []);

  const hero = useMemo<PageHeroProps>(
    () => ({
      title: t("tabs.hadith"),
      subtitle: t("hadith:tagline"),
      source: PAGE_MOSQUES.hadith,
      height: HERO,
      search: {
        value: draft,
        onChangeText,
        onSubmitEditing: () => setQuery(draft.trim()),
        placeholder: t("hadith:searchPlaceholder"),
      },
    }),
    [t, draft, onChangeText],
  );

  const intro = useMemo(
    () => (
      <View className="gap-6 px-4 pb-3 pt-2">
        {searching ? (
          <HadithSearchResults query={query} />
        ) : (
          <>
            <DailyHadithCard />
            <AppText className="px-1 text-sm text-main-gray">
              {t("hadith:searchHint")}
            </AppText>
            <SectionTitle title={t("hadith:collection")} />
          </>
        )}
      </View>
    ),
    [searching, query, t],
  );

  const header = useMemo(
    () => (
      <>
        <PageHero {...hero} />
        {intro}
      </>
    ),
    [hero, intro],
  );

  return (
    <View className="flex-1 bg-main-bg">
      <Animated.FlatList
        className="flex-1 bg-main-bg"
        style={{ direction }}
        contentContainerClassName="gap-3"
        contentContainerStyle={{ paddingBottom: 12 + tabBarSpace }}
        scrollIndicatorInsets={{ bottom: tabBarSpace }}
        contentInsetAdjustmentBehavior="never"
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        onScroll={onScroll}
        data={searching ? NONE : visible}
        keyExtractor={keyExtractor}
        initialNumToRender={4}
        windowSize={7}
        renderItem={renderHadith}
        onEndReached={searching ? undefined : loadMore}
        onEndReachedThreshold={0.6}
        ListFooterComponent={!searching && hasMore ? FOOTER : null}
        ListHeaderComponent={header}
      />
      <CompactHeroBar hero={hero} visible={compact} />
    </View>
  );
}
