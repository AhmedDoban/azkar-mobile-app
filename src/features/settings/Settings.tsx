import GlassSlider from "@/components/Inputs/GlassSlider";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import Screen from "@/components/ui/Screen";
import useArabicTextStyle from "@/hooks/useArabicTextStyle";
import useDirection from "@/hooks/useDirection";
import useThemeColors from "@/hooks/useThemeColors";
import { resetAllProgress } from "@/store/Slices/AzkarSlice";
import {
  ReadingSettings,
  setLocale,
  setReadingOption,
  setTextSize,
  TEXT_SIZE,
} from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import SettingsGroup from "./_ui/SettingsGroup";
import SettingsSwitchRow from "./_ui/SettingsSwitchRow";
import PressableScale from "@/components/ui/PressableScale";

const READING_OPTIONS: (keyof ReadingSettings)[] = [
  "hapticOnComplete",
  "hapticOnTap",
  "hideCompleted",
];

export default function Settings() {
  const { t } = useTranslation(["settings", "common"]);
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const textSize = useAppSelector((s) => s.settings.textSize);
  const reading = useAppSelector((s) => s.settings.reading);
  const isArabic = useAppSelector((s) => s.settings.locale === "ar");
  const { isRTL } = useDirection();
  const sizeGlyph = isRTL ? "أ" : "A";
  const previewStyle = useArabicTextStyle();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen title={t("common:tabs.settings")}>
        <SettingsGroup title={t("language")}>
          {/* Title and hint follow the switch: the current language, and what toggling does */}
          <SettingsSwitchRow
            title={isArabic ? "العربية" : "English"}
            subtitle={t(isArabic ? "arabicOnHint" : "arabicOffHint")}
            value={isArabic}
            onValueChange={(on) => dispatch(setLocale(on ? "ar" : "en"))}
          />
        </SettingsGroup>

        <SettingsGroup title={t("appearance")}>
          <ThemeSwitcher />
        </SettingsGroup>

        <SettingsGroup title={t("textSize")}>
          <View className="flex-row items-center gap-3">
            {/* Small and large letter at the ends, in the UI language */}
            <AppText weight="bold" className="text-sm text-main-gray">
              {sizeGlyph}
            </AppText>
            <View className="flex-1">
              <GlassSlider
                value={textSize}
                min={TEXT_SIZE.min}
                max={TEXT_SIZE.max}
                step={TEXT_SIZE.step}
                rtl={isRTL}
                onChange={(size) => dispatch(setTextSize(size))}
                accessibilityLabel={t("textSize")}
              />
            </View>
            <AppText weight="bold" className="text-2xl text-main-gray">
              {sizeGlyph}
            </AppText>
          </View>
          <View className="flex-row items-center justify-between gap-3">
            <AppText
              variant="quran"
              className="flex-1"
              style={previewStyle}
              numberOfLines={2}
            >
              سُبْحَانَ اللَّهِ وَبِحَمْدِهِ
            </AppText>
            <View className="rounded-full bg-main-soft px-3 py-1">
              <AppText weight="bold" className="text-sm text-main">
                {textSize}
              </AppText>
            </View>
          </View>
        </SettingsGroup>

        <SettingsGroup title={t("reading")}>
          {READING_OPTIONS.map((key, i) => (
            <View
              key={key}
              className={i > 0 ? "border-t border-line pt-3" : undefined}
            >
              <SettingsSwitchRow
                title={t(`${key}.title`)}
                subtitle={t(`${key}.hint`)}
                value={reading[key]}
                onValueChange={(value) => {
                  dispatch(setReadingOption({ key, value }));
                }}
              />
            </View>
          ))}
        </SettingsGroup>

        <SettingsGroup title={t("data")}>
          <PressableScale
            className="flex-row items-center gap-3"
            onPress={() => {
              dispatch(resetAllProgress());
              Alert.alert(t("resetProgressDone"));
            }}
          >
            <Icon name="reset" size={18} tintColor={colors.orange} />
            <AppText weight="bold" className="text-main-orange">
              {t("resetProgress")}
            </AppText>
          </PressableScale>
        </SettingsGroup>

        <SettingsGroup title={t("sources")}>
          <AppText className="leading-6 text-main-gray">
            {t("sourcesText")}
          </AppText>
          <AppText className="text-xs text-main-gray">
            v{Constants.expoConfig?.version}
          </AppText>
        </SettingsGroup>
      </Screen>
    </>
  );
}
