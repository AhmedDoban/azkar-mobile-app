import AppText from "@/components/ui/AppText";
import useHadithColors from "@/features/hadith/_components/useHadithColors";
import useArabicTextStyle from "@/hooks/useArabicTextStyle";
import { memo } from "react";
import { View } from "react-native";
import { ZikrContent } from "../_data";
import useZikrDisplay from "../_components/useZikrDisplay";
import ZikrHeading from "./ZikrHeading";

export default memo(function ZikrBody({
  content,
  arabic,
}: {
  content: ZikrContent;
  arabic: boolean;
}) {
  const p = useHadithColors();
  const textStyle = useArabicTextStyle(arabic ? 1 : 0.8);
  const noteStyle = useArabicTextStyle(0.7);
  const variant = arabic ? "quran" : "ui";
  const show = useZikrDisplay();

  return (
    <View className="gap-3">
      <ZikrHeading prefix={show.prefix ? content.prefix : ""} arabic={arabic} />

      {content.title ? (
        <AppText
          weight="bold"
          className="text-center text-sm"
          style={{ color: p.accent }}
        >
          {content.title}
        </AppText>
      ) : null}

      <AppText
        variant={variant}
        className="text-center"
        style={[textStyle, { color: p.ink }]}
        selectable
      >
        {content.text}
      </AppText>

      {show.suffix && content.suffix ? (
        <AppText
          variant={variant}
          className="text-center"
          style={[noteStyle, { color: p.muted }]}
        >
          {content.suffix}
        </AppText>
      ) : null}

      {show.virtue && content.virtue ? (
        <View
          className="rounded-2xl px-3 py-2"
          style={{ backgroundColor: p.chip }}
        >
          <AppText
            className="text-center text-sm leading-6"
            style={{ color: p.ink }}
          >
            {content.virtue}
          </AppText>
        </View>
      ) : null}

      {show.source && content.source ? (
        <AppText className="text-center text-xs" style={{ color: p.muted }}>
          {content.source}
        </AppText>
      ) : null}
    </View>
  );
});
