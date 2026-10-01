import { View } from "react-native";
import Skeleton from "@/components/ui/Skeleton";
import { REMINDER_PRAYERS } from "../_data/types";

export default function PrayerTimesCardSkeleton() {
  return (
    <View
      accessibilityLabel="Loading"
      className="flex-row gap-3 rounded-[28px] bg-surface p-4"
    >
      <View className="flex-1 gap-5">
        <Skeleton className="h-3 w-40" />
        <View className="flex-row items-center gap-3">
          <Skeleton className="size-[76px] rounded-full" />
          <Skeleton className="size-12 rounded-2xl" />
          <View className="flex-1 gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-7 w-24" />
          </View>
        </View>
        <View className="flex-row gap-1.5">
          {REMINDER_PRAYERS.map((name) => (
            <Skeleton key={name} className="h-20 flex-1 rounded-2xl" />
          ))}
        </View>
      </View>
      <Skeleton className="w-[26%] rounded-b-2xl rounded-t-full" />
    </View>
  );
}
