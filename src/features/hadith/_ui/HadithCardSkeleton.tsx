import { View } from "react-native";
import Skeleton from "@/components/ui/Skeleton";
import HadithPaper from "./HadithPaper";
import useDirection from "@/hooks/useDirection";

export default function HadithCardSkeleton() {
  const { isRTL } = useDirection();

  return (
    <HadithPaper>
      <View className={isRTL ? "items-start gap-3" : "items-end gap-3"}>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </View>
      <View className="flex-row flex-wrap gap-2 pt-2">
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-32 rounded-full" />
        <Skeleton className="h-7 w-20 rounded-full" />
      </View>
    </HadithPaper>
  );
}
