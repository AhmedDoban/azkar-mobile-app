import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import useHadithColors from "@/features/hadith/_components/useHadithColors";
import { View } from "react-native";

export default function ZikrCounter({
  counted,
  count,
  done,
}: {
  counted: number;
  count: number;
  done: boolean;
}) {
  const p = useHadithColors();

  return (
    <View
      className="flex-row items-baseline gap-1 rounded-full px-3.5 py-1.5"
      style={{ backgroundColor: done ? p.accent : p.chip }}
    >
      {done ? (
        <Icon name="check" size={16} strokeWidth={2.6} tintColor={p.onAccent} />
      ) : (
        <>
          <AppText
            weight="bold"
            className="text-xl"
            style={{ color: p.accent }}
          >
            {counted}
          </AppText>
          <AppText className="text-sm" style={{ color: p.muted }}>
            {`/ ${count}`}
          </AppText>
        </>
      )}
    </View>
  );
}
