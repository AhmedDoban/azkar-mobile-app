import AppText from "@/components/ui/AppText";
import BrandCardBackground from "@/components/ui/BrandCardBackground";
import PageHeader from "@/components/ui/PageHeader";
import { APP_ICONS } from "@/constants/appIcons";
import { useAppSelector } from "@/store/Store";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";

const GLASS = {
  backgroundColor: "rgba(255, 255, 255, 0.14)",
  borderColor: "rgba(255, 255, 255, 0.22)",
};

export default function SettingsHeader() {
  const { t } = useTranslation(["common", "settings", "azkar"]);
  const palette = useAppSelector((s) => s.settings.palette);

  return (
    <View className="gap-4">
      <PageHeader title={t("tabs.settings")} />

      <View
        className="overflow-hidden rounded-2xl"
        style={{ boxShadow: "0 10px 24px rgba(14, 58, 51, 0.25)" }}
      >
        <BrandCardBackground id="settingsCard" />

        <View className="flex-row items-center gap-4 p-5">
          <View
            className="overflow-hidden rounded-xl bg-white"
            style={{ boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)" }}
          >
            <Image
              source={APP_ICONS[palette]}
              style={{ width: 68, height: 68 }}
            />
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
