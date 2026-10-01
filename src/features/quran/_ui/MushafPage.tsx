import AppText from "@/components/ui/AppText";
import { toArabicDigits } from "@/features/azkar/_data/quran";
import { View } from "react-native";
import { Segment } from "../_components/buildPages";
import { PAGE } from "../_components/pageLayout";
import useMushafColors from "../_components/useMushafColors";
import SurahHeader from "./SurahHeader";

export default function MushafPage({
  segments,
  surahName,
  juz,
  footer,
  fontSize,
  lineHeight,
}: {
  fontSize: number;
  lineHeight: number;
  segments: Segment[];
  surahName: string;
  juz: number;
  footer: React.ReactNode;
}) {
  const c = useMushafColors();

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: c.page,
        paddingHorizontal: PAGE.paddingX,
        paddingTop: PAGE.paddingTop,
        paddingBottom: PAGE.paddingBottom,
        gap: PAGE.gap,
      }}
    >
      <View
        className="flex-row items-center justify-between"
        style={{ height: PAGE.topRow, direction: "rtl" }}
      >
        <AppText className="text-sm" style={{ color: c.gold }}>
          {`الجزء ${toArabicDigits(juz)}`}
        </AppText>
        <AppText className="text-sm" style={{ color: c.gold }}>
          {surahName}
        </AppText>
      </View>

      <View className="flex-1">
        {segments.map((segment, i) =>
          segment.kind === "header" ? (
            <SurahHeader
              key={`h${segment.surahId}`}
              surahId={segment.surahId}
              first={i === 0}
            />
          ) : (
            <AppText
              key={`t${segment.surahId}`}
              variant="quran"
              style={{
                color: c.ink,
                fontSize,
                lineHeight,
                textAlign: "justify",
                writingDirection: "rtl",
              }}
            >
              {segment.text}
            </AppText>
          ),
        )}
      </View>

      <View
        style={{ height: PAGE.footer }}
        className="items-center justify-center"
      >
        {footer}
      </View>
    </View>
  );
}
