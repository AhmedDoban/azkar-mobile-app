import AppText from "@/components/ui/AppText";
import useArabicTextStyle from "@/hooks/useArabicTextStyle";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { savedDorar } from "../_data/hadithKey";
import useHadithColors from "../_components/useHadithColors";
import { DorarHadith } from "../_components/parseDorar";
import HadithDivider from "./HadithDivider";
import GradeBadge from "./GradeBadge";
import HadithActions from "./HadithActions";
import HadithNumberMark from "./HadithNumberMark";
import HadithPaper from "./HadithPaper";
import MetaChip from "./MetaChip";

export default function DorarHadithCard({ hadith }: { hadith: DorarHadith }) {
  const { t } = useTranslation("hadith");
  const p = useHadithColors();
  const textStyle = useArabicTextStyle(0.85);

  const meta = [
    { label: t("narrator"), value: hadith.narrator },
    { label: t("scholar"), value: hadith.scholar },
  ].filter((m): m is { label: string; value: string } => !!m.value);

  return (
    <HadithPaper>
      {hadith.source || hadith.number ? (
        <View className="flex-row items-center gap-2">
          {hadith.number ? <HadithNumberMark value={hadith.number} /> : null}
          {hadith.source ? (
            <AppText
              weight="bold"
              className="flex-1 text-sm"
              style={{ color: p.accent }}
              numberOfLines={2}
            >
              {hadith.source}
            </AppText>
          ) : null}
        </View>
      ) : null}

      <AppText variant="quran" style={[textStyle, { color: p.ink }]} selectable>
        {hadith.text}
      </AppText>

      <HadithDivider />

      <View className="gap-3">
        {hadith.grade ? (
          <GradeBadge label={t("grade")} grade={hadith.grade} />
        ) : null}
        {meta.length ? (
          <View className="flex-row flex-wrap gap-2">
            {meta.map((m) => (
              <MetaChip key={m.label} label={m.label} value={m.value} />
            ))}
          </View>
        ) : null}
      </View>

      <View className="flex-row justify-center">
        <HadithActions
          text={[hadith.text, hadith.narrator, hadith.source, hadith.grade]
            .filter(Boolean)
            .join("\n")}
          saved={savedDorar(hadith)}
        />
      </View>
    </HadithPaper>
  );
}
