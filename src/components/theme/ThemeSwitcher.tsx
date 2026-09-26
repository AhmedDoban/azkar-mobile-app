import { useTranslation } from "react-i18next";
import { setTheme, ThemePreference } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import GlassDropdown from "../Inputs/GlassDropdown";
import { IconKey } from "../ui/Icon";

const THEMES: { value: ThemePreference; icon: IconKey }[] = [
  { value: "system", icon: "themeSystem" },
  { value: "light", icon: "themeLight" },
  { value: "dark", icon: "themeDark" },
];

/** System / light / dark in a glass dropdown menu */
export function ThemeSwitcher() {
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settings.theme);

  return (
    <GlassDropdown<ThemePreference>
      options={THEMES.map((o) => ({ ...o, label: t(o.value) }))}
      value={theme}
      onChange={(next) => dispatch(setTheme(next))}
      accessibilityLabel={t("appearance")}
    />
  );
}
