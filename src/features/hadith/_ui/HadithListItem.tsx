import { memo } from "react";
import { View } from "react-native";
import { LocalHadith } from "../_data";
import LocalHadithCard from "./LocalHadithCard";

export default memo(function HadithListItem({
  hadith,
}: {
  hadith: LocalHadith;
}) {
  return (
    <View className="px-4">
      <LocalHadithCard hadith={hadith} />
    </View>
  );
});
