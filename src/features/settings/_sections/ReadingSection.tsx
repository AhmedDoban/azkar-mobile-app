import {
  ReadingSettings,
  setReadingOption,
} from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import SettingsGroup from "../_ui/SettingsGroup";
import SettingsSwitchRow from "../_ui/SettingsSwitchRow";
import TextSizeSetting from "../_ui/TextSizeSetting";

const READING_OPTIONS: (keyof ReadingSettings)[] = [
  "hapticOnComplete",
  "hapticOnTap",
  "hideCompleted",
];

const CONTENT_OPTIONS: (keyof ReadingSettings)[] = [
  "showPrefix",
  "showSuffix",
  "showVirtue",
  "showSource",
];

export default function ReadingSection() {
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const reading = useAppSelector((s) => s.settings.reading);

  const renderOption = (key: keyof ReadingSettings, i: number) => (
    <View key={key} className={i > 0 ? "border-t border-line pt-3" : undefined}>
      <SettingsSwitchRow
        title={t(`${key}.title`)}
        subtitle={t(`${key}.hint`)}
        value={reading[key]}
        onValueChange={(value) => dispatch(setReadingOption({ key, value }))}
      />
    </View>
  );

  return (
    <>
      <SettingsGroup title={t("textSize")}>
        <TextSizeSetting />
      </SettingsGroup>
      <SettingsGroup title={t("readingOptions")}>
        {READING_OPTIONS.map(renderOption)}
      </SettingsGroup>
      <SettingsGroup title={t("zikrContent")}>
        {CONTENT_OPTIONS.map(renderOption)}
      </SettingsGroup>
    </>
  );
}
