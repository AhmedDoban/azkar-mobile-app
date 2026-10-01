import AppText from "@/components/ui/AppText";
import { View } from "react-native";

export default function CountdownUnit({
  value,
  unit,
}: {
  value: string;
  unit: string;
}) {
  return (
    <View className="items-center">
      <AppText weight="bold" className="text-[28px] leading-9 text-white">
        {value}
      </AppText>
      <AppText
        className="-mt-0.5 text-[10px] text-white"
        style={{ opacity: 0.7 }}
      >
        {unit}
      </AppText>
    </View>
  );
}
