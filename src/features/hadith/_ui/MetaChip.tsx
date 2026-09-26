import { View } from "react-native";
import AppText from "@/components/ui/AppText";
import { cn } from "@/lib/utils";

export default function MetaChip({
  label,
  value,
  tone = "muted",
}: {
  label?: string;
  value: string;
  tone?: "muted" | "main";
}) {
  return (
    <View
      className={cn(
        "flex-row gap-1 rounded-full px-3 py-1.5",
        tone === "main" ? "bg-main-soft" : "bg-surface-muted",
      )}
    >
      {label ? (
        <AppText className="text-xs text-main-gray">{label}:</AppText>
      ) : null}
      <AppText
        weight="bold"
        className={cn("text-xs", tone === "main" ? "text-main" : "text-ink")}
      >
        {value}
      </AppText>
    </View>
  );
}
