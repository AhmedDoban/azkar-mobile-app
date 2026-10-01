import AppText from "@/components/ui/AppText";
import { View } from "react-native";
import useHadithColors from "../_components/useHadithColors";

const SIZE = 30;

export default function HadithNumberMark({ value }: { value: string }) {
  const p = useHadithColors();

  return (
    <View
      className="items-center justify-center"
      style={{ width: SIZE + 6, height: SIZE + 6 }}
    >
      <View
        className="absolute rotate-45 rounded-md border"
        style={{
          width: SIZE * 0.78,
          height: SIZE * 0.78,
          borderColor: p.accent,
          backgroundColor: p.paper,
        }}
      />
      <AppText
        weight="bold"
        className="text-[11px]"
        style={{ color: p.accent }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </AppText>
    </View>
  );
}
