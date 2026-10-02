import AppText from "@/components/ui/AppText";
import SectionTitle from "@/components/ui/SectionTitle";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import DailyHadithCard from "./DailyHadithCard";
import HadithSearchResults from "./HadithSearchResults";

export default memo(function HadithIntro({ query }: { query: string }) {
  const { t } = useTranslation("hadith");

  return (
    <View className="gap-6 px-4 pb-3 pt-2">
      {query.length > 0 ? (
        <HadithSearchResults query={query} />
      ) : (
        <>
          <DailyHadithCard />
          <AppText className="px-1 text-sm text-main-gray">
            {t("searchHint")}
          </AppText>
          <SectionTitle title={t("collection")} />
        </>
      )}
    </View>
  );
});
