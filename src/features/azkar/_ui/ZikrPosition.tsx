import AppText from "@/components/ui/AppText";
import useHadithColors from "@/features/hadith/_components/useHadithColors";
import { View } from "react-native";

export default function ZikrPosition({
  index,
  total,
}: {
  index: number;
  total: number;
}) {
  const p = useHadithColors();

  return (
    <View
      className="rounded-full px-2.5 py-0.5"
      style={{ backgroundColor: p.chip }}
    >
      <AppText className="text-xs" style={{ color: p.muted }}>
        {`${index} / ${total}`}
      </AppText>
    </View>
  );
}
