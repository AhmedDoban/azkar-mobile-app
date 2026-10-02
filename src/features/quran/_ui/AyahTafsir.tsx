import AppText from "@/components/ui/AppText";
import { AyahRef } from "@/features/azkar/_data/quran";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import usePopupColors from "../_components/usePopupColors";
import useTafsir from "../_components/useTafsir";

export default function AyahTafsir({
  ayah,
  open,
  lines,
  onToggle,
  onLines,
}: {
  ayah: AyahRef;
  open: boolean;
  lines: number;
  onToggle: () => void;
  onLines: (lines: number) => void;
}) {
  const { t } = useTranslation("azkar");
  const c = usePopupColors();
  const tafsir = useTafsir(ayah);

  return (
    <View className="gap-3 rounded-2xl p-4" style={{ backgroundColor: c.page }}>
      {tafsir ? (
        <>
          <AppText
            arabic={tafsir.arabic}
            className="absolute inset-x-4 top-4 text-base leading-8"
            style={{ opacity: 0 }}
            onTextLayout={(e) => onLines(e.nativeEvent.lines.length)}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            {tafsir.text}
          </AppText>
          <AppText
            arabic={tafsir.arabic}
            className="text-base leading-8"
            style={{ color: c.ink }}
            numberOfLines={open ? undefined : 5}
          >
            {tafsir.text}
          </AppText>
          <View className="flex-row items-center justify-between">
            {lines > 5 ? (
              <Pressable onPress={onToggle} hitSlop={8}>
                <AppText weight="bold" style={{ color: c.accent }}>
                  {t(open ? "seeLess" : "seeMore")}
                </AppText>
              </Pressable>
            ) : (
              <View />
            )}
            <AppText className="text-xs" style={{ color: c.gold }}>
              {tafsir.source}
            </AppText>
          </View>
        </>
      ) : null}
    </View>
  );
}
