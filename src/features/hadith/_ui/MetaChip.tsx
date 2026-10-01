import AppText from "@/components/ui/AppText";
import { View } from "react-native";
import useHadithColors from "../_components/useHadithColors";

export default function MetaChip({
  label,
  value,
  tone = "muted",
}: {
  label?: string;
  value: string;
  tone?: "muted" | "main";
}) {
  const p = useHadithColors();

  return (
    <View
      className="flex-row gap-1 rounded-full px-3 py-1.5"
      style={{ backgroundColor: p.chip }}
    >
      {label ? (
        <AppText className="text-xs" style={{ color: p.muted }}>
          {label}:
        </AppText>
      ) : null}
      <AppText
        weight="bold"
        className="text-xs"
        style={{ color: tone === "main" ? p.accent : p.ink }}
      >
        {value}
      </AppText>
    </View>
  );
}
