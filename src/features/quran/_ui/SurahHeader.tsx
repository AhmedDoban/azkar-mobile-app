import AppText from "@/components/ui/AppText";
import { getSurah } from "@/features/azkar/_data/quran";
import { View } from "react-native";
import { hasBasmala, PAGE } from "../_components/pageLayout";
import useMushafColors from "../_components/useMushafColors";
import SurahBanner from "./SurahBanner";

export default function SurahHeader({
  surahId,
  first,
}: {
  surahId: number;
  first: boolean;
}) {
  const c = useMushafColors();
  const basmala = hasBasmala(surahId)
    ? (getSurah(1)?.verses[0].text ?? null)
    : null;

  return (
    <View
      style={{
        gap: PAGE.gap,
        paddingTop: first ? 0 : PAGE.gap,
        paddingBottom: PAGE.gap,
      }}
    >
      <View style={{ height: PAGE.banner }}>
        <SurahBanner surahId={surahId} />
      </View>
      {basmala ? (
        <View
          style={{ height: PAGE.basmala }}
          className="items-center justify-center"
        >
          <AppText variant="quran" className="text-xl" style={{ color: c.ink }}>
            {basmala}
          </AppText>
        </View>
      ) : null}
    </View>
  );
}
