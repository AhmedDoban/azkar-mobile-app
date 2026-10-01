import AppText from "@/components/ui/AppText";
import PageHeader from "@/components/ui/PageHeader";
import useThemeColors from "@/hooks/useThemeColors";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

const LOGO = require("@/assets/images/icon.png");
const DECOR = require("@/assets/images/NextPray_bg.webp");
const GLASS = {
  backgroundColor: "rgba(255, 255, 255, 0.14)",
  borderColor: "rgba(255, 255, 255, 0.22)",
};

export default function SettingsHeader() {
  const { t } = useTranslation(["common", "settings", "azkar"]);
  const colors = useThemeColors();

  return (
    <View className="gap-4">
      <PageHeader title={t("tabs.settings")} />

      <View
        className="overflow-hidden rounded-2xl"
        style={{ boxShadow: "0 10px 24px rgba(14, 58, 51, 0.25)" }}
      >
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="settingsCard" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={colors.brand.mid} />
              <Stop offset="1" stopColor={colors.brand.deep} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#settingsCard)" />
        </Svg>
        <Image
          source={DECOR}
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, { width: "100%", height: "100%" }]}
        />

        <View className="flex-row items-center gap-4 p-5">
          <View
            className="overflow-hidden rounded-xl bg-white"
            style={{ boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)" }}
          >
            <Image source={LOGO} style={{ width: 68, height: 68 }} />
          </View>

          <View className="flex-1 gap-1">
            <AppText weight="bold" className="text-2xl leading-9 text-white">
              {t("appName")}
            </AppText>
            <AppText className="text-xs text-white" style={{ opacity: 0.8 }}>
              {t("azkar:tagline")}
            </AppText>
            <View
              className="mt-1 self-start rounded-full border px-2.5 py-0.5"
              style={GLASS}
            >
              <AppText className="text-[11px] text-white">
                {t("settings:version", {
                  version: Constants.expoConfig?.version,
                })}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
