import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";
import { EXTERNAL_SOURCES } from "../_data/externalSources";
import SettingsGroup from "../_ui/SettingsGroup";
import SettingsIntro from "../_ui/SettingsIntro";
import SourceRow from "../_ui/SourceRow";

export default function SourcesSection() {
  const { t } = useTranslation("settings");
  const palette = useSettingsColors();

  return (
    <>
      <SettingsIntro text={t("sourcesHint")} />
      <SettingsGroup title={t("externalSources")}>
        {EXTERNAL_SOURCES.map((source, i) => (
          <View
            key={source.id}
            className={i > 0 ? "border-t" : undefined}
            style={i > 0 ? { borderColor: palette.border } : undefined}
          >
            <SourceRow
              icon={source.icon}
              name={t(`sourceList.${source.id}.name`)}
              usage={t(`sourceList.${source.id}.usage`)}
              url={source.url}
            />
          </View>
        ))}
      </SettingsGroup>
    </>
  );
}
