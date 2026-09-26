import SearchHeader from "@/components/Inputs/SearchHeader";
import AppText from "@/components/ui/AppText";
import SectionTitle from "@/components/ui/SectionTitle";
import useDirection from "@/hooks/useDirection";
import usePageInsets from "@/hooks/usePageInsets";
import { Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import HadithSearchResults from "./_components/HadithSearchResults";
import { hadiths } from "./_data";
import DailyHadithCard from "./_ui/DailyHadithCard";
import LocalHadithCard from "./_ui/LocalHadithCard";

export default function HadithHome() {
  const { t } = useTranslation(["common", "hadith"]);
  const { direction } = useDirection();
  const insets = usePageInsets();
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const searching = query.length > 0;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {/* The list is the root view so iOS 26 can minimize the tab bar on scroll */}
      <FlatList
        className="flex-1 bg-main-bg"
        style={{ direction }}
        contentContainerClassName="gap-3 px-4"
        contentContainerStyle={insets}
        contentInsetAdjustmentBehavior="never"
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        data={searching ? [] : hadiths}
        keyExtractor={(item) => item.id}
        initialNumToRender={6}
        renderItem={({ item }) => <LocalHadithCard hadith={item} />}
        ListHeaderComponent={
          <View className="gap-6 pb-3">
            <SearchHeader
              title={t("tabs.hadith")}
              value={draft}
              onChangeText={(text) => {
                setDraft(text);
                if (!text.trim()) setQuery("");
              }}
              onSubmitEditing={() => setQuery(draft.trim())}
              placeholder={t("hadith:searchPlaceholder")}
            />
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
        }
      />
    </>
  );
}
