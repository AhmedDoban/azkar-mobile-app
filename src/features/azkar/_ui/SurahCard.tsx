import { memo } from "react";
import IconCircle from "@/components/ui/IconCircle";
import useThemeColors from "@/hooks/useThemeColors";
import TileCard from "./TileCard";

export default memo(function SurahCard({
  surahId,
  title,
  subtitle,
}: {
  surahId: number;
  title: string;
  subtitle: string;
}) {
  const colors = useThemeColors();

  return (
    <TileCard
      href={`/surah/${surahId}`}
      title={title}
      subtitle={subtitle}
      trailing={
        <IconCircle
          icon="quran"
          tintColor={colors.main}
          backgroundColor={colors.surface}
        />
      }
    />
  );
});
