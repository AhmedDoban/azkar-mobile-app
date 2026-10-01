import CompactHeroBar from "@/components/hero/CompactHeroBar";
import PageHero, { PageHeroProps } from "@/components/hero/PageHero";
import AppText from "@/components/ui/AppText";
import SectionTitle from "@/components/ui/SectionTitle";
import { PAGE_MOSQUES } from "@/constants/mosques";
import useDirection from "@/hooks/useDirection";
import useTabBarSpace from "@/hooks/useTabBarSpace";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import HadithSearchResults from "./_components/HadithSearchResults";
import { hadiths } from "./_data";
import DailyHadithCard from "./_ui/DailyHadithCard";
import LocalHadithCard from "./_ui/LocalHadithCard";

const HERO = 220;
const COMPACT_AT = 90;

export default function HadithHome() {
  const { t } = useTranslation(["common", "hadith"]);
  const { direction } = useDirection();
  const tabBarSpace = useTabBarSpace();
  const [compact, setCompact] = useState(false);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const searching = query.length > 0;

  const hero: PageHeroProps = {
    title: t("tabs.hadith"),
    subtitle: t("hadith:tagline"),
    source: PAGE_MOSQUES.hadith,
    height: HERO,
    search: {
      value: draft,
      onChangeText: (text) => {
        setDraft(text);
        if (!text.trim()) setQuery("");
      },
      onSubmitEditing: () => setQuery(draft.trim()),
      placeholder: t("hadith:searchPlaceholder"),
    },
  };

  return (
    <View className="flex-1 bg-main-bg">
      <FlatList
        className="flex-1 bg-main-bg"
        style={{ direction }}
        contentContainerClassName="gap-3"
        contentContainerStyle={{ paddingBottom: 12 + tabBarSpace }}
        scrollIndicatorInsets={{ bottom: tabBarSpace }}
        contentInsetAdjustmentBehavior="never"
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        onScroll={(e) => {
          const next = e.nativeEvent.contentOffset.y > HERO - COMPACT_AT;
          if (next !== compact) setCompact(next);
        }}
        data={searching ? [] : hadiths}
        keyExtractor={(item) => item.id}
        initialNumToRender={6}
        renderItem={({ item }) => (
          <View className="px-4">
            <LocalHadithCard hadith={item} />
          </View>
        )}
        ListHeaderComponent={
          <>
            <PageHero {...hero} />
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
          </>
        }
      />
      <CompactHeroBar hero={hero} visible={compact} />
    </View>
  );
}
