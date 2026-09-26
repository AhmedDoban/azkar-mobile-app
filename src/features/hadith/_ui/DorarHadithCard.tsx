import { View } from "react-native";
import { useTranslation } from "react-i18next";
import AppText from "@/components/ui/AppText";
import useArabicTextStyle from "@/hooks/useArabicTextStyle";
import { savedDorar } from "../_components/hadithKey";
import { DorarHadith } from "../_components/parseDorar";
import GradeBadge from "./GradeBadge";
import HadithActions from "./HadithActions";
import MetaChip from "./MetaChip";

export default function DorarHadithCard({ hadith }: { hadith: DorarHadith }) {
  const { t } = useTranslation("hadith");
  const textStyle = useArabicTextStyle(0.85);

  const meta = [
    { label: t("narrator"), value: hadith.narrator },
    { label: t("scholar"), value: hadith.scholar },
    { label: t("source"), value: hadith.source },
    { label: t("number"), value: hadith.number },
  ].filter((m): m is { label: string; value: string } => !!m.value);

  return (
    <View className="gap-4 overflow-hidden rounded-3xl border border-line bg-surface p-5">
      <AppText variant="quran" style={textStyle} selectable>
        {hadith.text}
      </AppText>

      <View className="gap-3 border-t border-line pt-4">
        {hadith.grade ? (
          <GradeBadge label={t("grade")} grade={hadith.grade} />
        ) : null}
        <View className="flex-row flex-wrap gap-2">
          {meta.map((m) => (
            <MetaChip key={m.label} label={m.label} value={m.value} />
          ))}
        </View>
      </View>

      <View className="flex-row justify-end">
        <HadithActions
          text={[hadith.text, hadith.narrator, hadith.source, hadith.grade]
            .filter(Boolean)
            .join("\n")}
          saved={savedDorar(hadith)}
        />
      </View>
    </View>
  );
}
