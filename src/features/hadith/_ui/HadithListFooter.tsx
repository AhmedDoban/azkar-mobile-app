import { View } from "react-native";
import HadithCardSkeleton from "./HadithCardSkeleton";

export default function HadithListFooter() {
  return (
    <View className="px-4">
      <HadithCardSkeleton />
    </View>
  );
}
