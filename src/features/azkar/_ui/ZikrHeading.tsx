import AppText from "@/components/ui/AppText";
import useHadithColors from "@/features/hadith/_components/useHadithColors";
import useArabicTextStyle from "@/hooks/useArabicTextStyle";
import { memo } from "react";

export default memo(function ZikrHeading({
  prefix,
  arabic,
}: {
  prefix: string;
  arabic: boolean;
}) {
  const p = useHadithColors();
  const style = useArabicTextStyle(arabic ? 1.15 : 0.95);

  if (!prefix) return null;

  if (arabic) {
    return (
      <AppText
        variant="quran"
        className="text-center"
        style={[style, { color: p.accent }]}
      >
        {`﴿${prefix}﴾`}
      </AppText>
    );
  }

  return (
    <AppText
      weight="bold"
      className="text-center"
      style={[style, { color: p.accent }]}
    >
      <AppText variant="quran">﴿ </AppText>
      {prefix}
      <AppText variant="quran"> ﴾</AppText>
    </AppText>
  );
});
