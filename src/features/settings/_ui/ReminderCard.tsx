import AppText from "@/components/ui/AppText";
import { ReminderKind } from "@/store/Slices/SettingsSlice";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useReminderSetting from "../_components/useReminderSetting";
import useSettingsColors from "../_components/useSettingsColors";
import ReminderIntervalPicker from "./ReminderIntervalPicker";
import SettingsGroup from "./SettingsGroup";
import SettingsSwitchRow from "./SettingsSwitchRow";

export default function ReminderCard({
  kind,
  onDenied,
}: {
  kind: ReminderKind;
  onDenied: () => void;
}) {
  const { t } = useTranslation("settings");
  const palette = useSettingsColors();
  const { enabled, every, setEnabled, setEvery } = useReminderSetting(
    kind,
    onDenied,
  );

  return (
    <SettingsGroup title={t(`reminders.${kind}.group`)}>
      <SettingsSwitchRow
        title={t(`reminders.${kind}.title`)}
        subtitle={t(`reminders.${kind}.hint`)}
        value={enabled}
        onValueChange={setEnabled}
      />
      {enabled ? (
        <View className="gap-3 border-t border-line pt-3">
          <AppText weight="bold" className="text-sm">
            {t("reminders.interval")}
          </AppText>
          <ReminderIntervalPicker value={every} onChange={setEvery} />
          <AppText className="text-xs" style={{ color: palette.subtitle }}>
            {t("reminders.window")}
          </AppText>
        </View>
      ) : null}
    </SettingsGroup>
  );
}
