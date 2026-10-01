import { View } from "react-native";
import { cn } from "@/lib/utils";

export default function Ornament({
  flip,
  className,
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <View
      className={cn("flex-1 flex-row items-center gap-1.5", className)}
      style={flip ? { flexDirection: "row-reverse" } : undefined}
    >
      <View className="h-px flex-1 bg-main-border opacity-40" />
      <View className="size-1.5 rotate-45 bg-main" />
    </View>
  );
}
