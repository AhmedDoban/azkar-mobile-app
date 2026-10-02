import { memo } from "react";
import { View } from "react-native";
import { AzkarCategory } from "../_data";
import FeaturedCard from "./FeaturedCard";

export default memo(function CategoryGrid({
  categories,
  showProgress = true,
}: {
  categories: AzkarCategory[];
  showProgress?: boolean;
}) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {categories.map((category) => (
        <View key={category.id} className="w-[48%]">
          <FeaturedCard category={category} showProgress={showProgress} />
        </View>
      ))}
    </View>
  );
});
