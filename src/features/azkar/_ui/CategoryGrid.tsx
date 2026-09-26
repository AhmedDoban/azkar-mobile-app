import { View } from "react-native";
import { AzkarCategory } from "../_data";
import FeaturedCard from "./FeaturedCard";

/** Two tiles per row, equal height per row; a lone last tile keeps half width */
export default function CategoryGrid({
  categories,
  showProgress = true,
}: {
  categories: AzkarCategory[];
  /** false = no counters or progress ring (used in Favorites) */
  showProgress?: boolean;
}) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {categories.map((category) => (
        <View key={category.id} className="w-[48%]">
          <FeaturedCard
            category={category}
            showProgress={showProgress}
          />
        </View>
      ))}
    </View>
  );
}
