import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import PalettePicker from "../_ui/PalettePicker";
import SettingsGroup from "../_ui/SettingsGroup";

export default function AppearanceSection() {
  const { t } = useTranslation("settings");
  return (
    <>
      <SettingsGroup title={t("theme")}>
        <ThemeSwitcher />
      </SettingsGroup>
      <SettingsGroup title={t("appColor")}>
        <PalettePicker />
      </SettingsGroup>
    </>
  );
}
