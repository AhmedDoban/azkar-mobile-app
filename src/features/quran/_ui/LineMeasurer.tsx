import AppText from "@/components/ui/AppText";
import { getSurah } from "@/features/azkar/_data/quran";
import { surahText } from "../_components/buildPages";
import { lineHeightFor } from "../_components/pageLayout";

export default function LineMeasurer({
  surahId,
  width,
  fontSize,
  onLines,
}: {
  fontSize: number;
  surahId: number;
  width: number;
  onLines: (surahId: number, lines: string[], lineHeight?: number) => void;
}) {
  const surah = getSurah(surahId);
  if (!surah) return null;

  return (
    <AppText
      key={`${surahId}:${fontSize}`}
      variant="quran"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      onTextLayout={(e) => {
        const lines = e.nativeEvent.lines;
        const step =
          lines.length > 2
            ? (lines[lines.length - 1].y - lines[0].y) / (lines.length - 1)
            : lines[0]?.height;
        onLines(
          surahId,
          lines.map((line) => line.text),
          step,
        );
      }}
      style={{
        position: "absolute",
        opacity: 0,
        width,
        fontSize,
        lineHeight: lineHeightFor(fontSize),
        writingDirection: "rtl",
      }}
    >
      {surahText(surah)}
    </AppText>
  );
}
