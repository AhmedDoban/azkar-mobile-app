import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import { getRandomVerse } from "../_data/quran";

const BACKGROUND = require("@/assets/images/qoran_bg.webp");
const LIGHT = Colors.light;
const CREAM = "#fbfaf4";

export default function VerseOfDayCard() {
  const { t, i18n } = useTranslation("azkar");
  const verse = getRandomVerse();
  const english = i18n.language === "en";

  return (
    <View
      className="overflow-hidden rounded-[28px] border"
      style={{ backgroundColor: CREAM, borderColor: LIGHT.line }}
    >
      <Image
        source={BACKGROUND}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, { width: "100%", height: "100%" }]}
      />

      <View className="flex-row" style={{ direction: "ltr" }}>
        <View style={{ width: "34%" }} />
        <View
          className="flex-1 gap-3 py-5 pe-5 ps-2"
          style={{ direction: english ? "ltr" : "rtl" }}
        >
          <View className="flex-row items-center gap-2.5">
            <View
              className="size-10 items-center justify-center rounded-full"
              style={{ backgroundColor: LIGHT.mainSoft }}
            >
              <Icon name="quran" size={20} tintColor={LIGHT.main} />
            </View>
            <AppText
              weight="bold"
              className="text-base"
              style={{ color: LIGHT.ink }}
            >
              {t("verseOfDay")}
            </AppText>
          </View>

          <AppText
            variant="quran"
            style={{ fontSize: 20, lineHeight: 38, color: LIGHT.main }}
          >
            {`﴿ ${verse.text} ﴾`}
          </AppText>

          {english ? (
            <AppText className="text-sm leading-5" style={{ color: LIGHT.ink }}>
              {verse.translation}
            </AppText>
          ) : null}

          <AppText className="text-xs" style={{ color: LIGHT.gray }}>
            {t("verseRef", {
              surah: english ? verse.surahEn : verse.surah,
              ayah: verse.ayah,
            })}
          </AppText>
        </View>
      </View>
    </View>
  );
}
