import AppText from "@/components/ui/AppText";
import Screen from "@/components/ui/Screen";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useSectionSummary from "./_components/useSectionSummary";
import useSettingsColors from "./_components/useSettingsColors";
import { SETTINGS_GROUPS, SETTINGS_SECTIONS } from "./_data/sections";
import SettingsGroup from "./_ui/SettingsGroup";
import SettingsHeader from "./_ui/SettingsHeader";
import SettingsNavRow from "./_ui/SettingsNavRow";
import SocialLinks from "./_ui/SocialLinks";

export default function Settings() {
  const { t } = useTranslation(["settings", "common"]);
  const palette = useSettingsColors();
  const summary = useSectionSummary();

  return (
    <Screen title={t("common:tabs.settings")} header={<SettingsHeader />}>
      {SETTINGS_GROUPS.map((group) => (
        <SettingsGroup key={group} title={t(`groups.${group}`)}>
          {SETTINGS_SECTIONS.filter((s) => s.group === group).map(
            (section, i) => (
              <View
                key={section.id}
                className={i > 0 ? "border-t" : undefined}
                style={i > 0 ? { borderColor: palette.border } : undefined}
              >
                <SettingsNavRow
                  icon={section.icon}
                  title={t(section.title)}
                  value={summary(section.id)}
                  onPress={() =>
                    router.push({
                      pathname: "/settings/[section]",
                      params: { section: section.id },
                    })
                  }
                />
              </View>
            ),
          )}
        </SettingsGroup>
      ))}

      <View className="items-center gap-3 pt-2">
        <View className="items-center gap-1">
          <AppText weight="bold" className="text-base">
            {t("followDeveloper")}
          </AppText>
          <AppText
            className="text-center text-sm"
            style={{ color: palette.subtitle }}
          >
            {t("followDeveloperHint")}
          </AppText>
        </View>
        <SocialLinks />
      </View>
    </Screen>
  );
}
