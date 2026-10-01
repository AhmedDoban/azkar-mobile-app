import GlassSlider from "@/components/Inputs/GlassSlider";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import AppText from "@/components/ui/AppText";
import type { IconKey } from "@/components/ui/Icon";
import Screen from "@/components/ui/Screen";
import useArabicTextStyle from "@/hooks/useArabicTextStyle";
import useDirection from "@/hooks/useDirection";
import { resetAllProgress, resetAzkarData } from "@/store/Slices/AzkarSlice";
import {
  ReadingSettings,
  resetSettings,
  setReadingOption,
  setTextSize,
  TEXT_SIZE,
} from "@/store/Slices/SettingsSlice";
import { clearApiCache, useAppDispatch, useAppSelector } from "@/store/Store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useSettingsColors from "./_components/useSettingsColors";
import AdhanSoundPicker from "./_ui/AdhanSoundPicker";
import LanguageSwitcher from "./_ui/LanguageSwitcher";
import QuranSizeSetting from "./_ui/QuranSizeSetting";
import ResetDialog, { ResetDialogContent } from "./_ui/ResetDialog";
import SettingsActionRow from "./_ui/SettingsActionRow";
import SettingsGroup from "./_ui/SettingsGroup";
import SettingsHeader from "./_ui/SettingsHeader";
import SettingsSwitchRow from "./_ui/SettingsSwitchRow";
import SocialLinks from "./_ui/SocialLinks";

const READING_OPTIONS: (keyof ReadingSettings)[] = [
  "hapticOnComplete",
  "hapticOnTap",
  "hideCompleted",
];

type SourceKey = "quran" | "adhkar" | "hadith" | "dorar" | "prayer" | "qibla";

const SOURCES: { key: SourceKey; icon: IconKey; url?: string }[] = [
  { key: "quran", icon: "quran" },
  { key: "adhkar", icon: "heart" },
  { key: "hadith", icon: "quote" },
  { key: "dorar", icon: "search", url: "https://dorar.net" },
  {
    key: "prayer",
    icon: "personPraying",
    url: "https://quran.yousefheiba.com",
  },
  { key: "qibla", icon: "location" },
];

type ResetKind = "progress" | "cache" | "settings" | "all";

export default function Settings() {
  const { t } = useTranslation(["settings", "common"]);
  const palette = useSettingsColors();
  const [pending, setPending] = useState<ResetKind | null>(null);

  const actions: Record<ResetKind, ResetDialogContent> = {
    progress: {
      icon: "reset",
      title: t("confirm.progress.title"),
      message: t("confirm.progress.message"),
      confirmLabel: t("confirm.progress.action"),
      doneText: t("confirm.progress.done"),
      danger: true,
      onConfirm: () => dispatch(resetAllProgress()),
    },
    cache: {
      icon: "clearCache",
      title: t("confirm.cache.title"),
      message: t("confirm.cache.message"),
      confirmLabel: t("confirm.cache.action"),
      doneText: t("confirm.cache.done"),
      danger: false,
      onConfirm: () => clearApiCache(dispatch),
    },
    settings: {
      icon: "resetSettings",
      title: t("confirm.settings.title"),
      message: t("confirm.settings.message"),
      confirmLabel: t("confirm.settings.action"),
      doneText: t("confirm.settings.done"),
      danger: false,
      onConfirm: () => dispatch(resetSettings()),
    },
    all: {
      icon: "resetAll",
      title: t("confirm.all.title"),
      message: t("confirm.all.message"),
      confirmLabel: t("confirm.all.action"),
      doneText: t("confirm.all.done"),
      danger: true,
      onConfirm: () => {
        dispatch(resetAzkarData());
        dispatch(resetSettings());
        clearApiCache(dispatch);
      },
    },
  };
  const dispatch = useAppDispatch();
  const textSize = useAppSelector((s) => s.settings.textSize);
  const reading = useAppSelector((s) => s.settings.reading);
  const { isRTL } = useDirection();
  const sizeGlyph = isRTL ? "أ" : "A";
  const previewStyle = useArabicTextStyle();

  return (
    <>
      <Screen title={t("common:tabs.settings")} header={<SettingsHeader />}>
        <SettingsGroup title={t("language")} plain>
          <LanguageSwitcher />
        </SettingsGroup>

        <SettingsGroup title={t("appearance")}>
          <ThemeSwitcher />
        </SettingsGroup>

        <SettingsGroup title={t("textSize")}>
          <View className="flex-row items-center gap-3">
            <AppText
              weight="bold"
              className="text-sm"
              style={{ color: palette.subtitle }}
            >
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
            <AppText
              weight="bold"
              className="text-2xl"
              style={{ color: palette.subtitle }}
            >
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
            <View className="rounded-full bg-accent-soft px-3 py-1">
              <AppText weight="bold" className="text-sm text-accent">
                {textSize}
              </AppText>
            </View>
          </View>
        </SettingsGroup>

        <SettingsGroup title={t("quranSize")}>
          <QuranSizeSetting />
        </SettingsGroup>

        <SettingsGroup title={t("adhanSound")} plain>
          <AdhanSoundPicker />
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

        <SettingsGroup title={t("data")} plain>
          <SettingsActionRow
            icon="clearCache"
            label={t("clearCache")}
            onPress={() => setPending("cache")}
          />
          <SettingsActionRow
            icon="resetSettings"
            label={t("resetSettings")}
            onPress={() => setPending("settings")}
          />
          <SettingsActionRow
            icon="reset"
            label={t("resetProgress")}
            danger
            onPress={() => setPending("progress")}
          />
          <SettingsActionRow
            icon="resetAll"
            label={t("resetAll")}
            danger
            onPress={() => setPending("all")}
          />
        </SettingsGroup>

        {/* <SettingsGroup title={t("sources")}>
          {SOURCES.map(({ key, icon, url }, i) => (
            <View
              key={key}
              className={i > 0 ? "border-t pt-3" : undefined}
              style={i > 0 ? { borderColor: palette.border } : undefined}
            >
              <SettingsLinkRow
                icon={icon}
                title={t(`source.${key}.title`)}
                subtitle={t(`source.${key}.hint`)}
                url={url}
              />
            </View>
          ))}
        </SettingsGroup> */}

        <View className="items-center gap-3 pt-2">
          <SocialLinks />
        </View>
      </Screen>
      <ResetDialog
        content={pending ? actions[pending] : null}
        onClose={() => setPending(null)}
      />
    </>
  );
}
