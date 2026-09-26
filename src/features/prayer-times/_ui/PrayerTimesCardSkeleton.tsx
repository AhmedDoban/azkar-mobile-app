import { View } from "react-native";
import Skeleton from "@/components/ui/Skeleton";
import { REMINDER_PRAYERS } from "../_data/types";

/** Same shape as the prayer hero card: date line, next prayer, the chip row */
export default function PrayerTimesCardSkeleton() {
  return (
    <View
      accessibilityLabel="Loading"
      className="gap-5 rounded-3xl bg-surface p-5"
    >
      <Skeleton className="h-3 w-40" />
      <View className="flex-row items-center gap-3">
        <Skeleton className="size-12 rounded-2xl" />
        <View className="flex-1 gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-24" />
        </View>
        <Skeleton className="h-10 w-24" />
      </View>
      <View className="flex-row gap-1.5">
        {REMINDER_PRAYERS.map((name) => (
          <Skeleton key={name} className="h-20 flex-1 rounded-2xl" />
        ))}
      </View>
    </View>
  );
}
