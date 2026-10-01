import AppText from "@/components/ui/AppText";
import { View } from "react-native";
import { toArabicDigits } from "@/features/azkar/_data/quran";
import useMushafColors from "../_components/useMushafColors";

export default function PageNumber({ page }: { page: number }) {
  const c = useMushafColors();

  return (
    <View
      className="min-w-20 items-center rounded-full border-2 px-5 py-0.5"
      style={{ borderColor: c.frame, backgroundColor: c.frameFill }}
    >
      <AppText
        arabic
        weight="bold"
        className="text-lg"
        style={{ color: c.ink }}
      >
        {toArabicDigits(page)}
      </AppText>
    </View>
  );
}
