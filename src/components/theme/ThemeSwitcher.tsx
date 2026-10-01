import { setTheme, ThemePreference } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { IconKey } from "../ui/Icon";
import ThemeOption from "./ThemeOption";

const THEMES: { value: ThemePreference; icon: IconKey }[] = [
  { value: "system", icon: "themeSystem" },
  { value: "light", icon: "themeLight" },
  { value: "dark", icon: "themeDark" },
];

export function ThemeSwitcher() {
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settings.theme);

  return (
    <View accessibilityRole="radiogroup" className="flex-row gap-3">
      {THEMES.map(({ value, icon }) => (
        <ThemeOption
          key={value}
          label={t(value)}
          icon={icon}
          preview={value}
          selected={theme === value}
          onPress={() => {
            if (theme === value) return;
            Haptics.selectionAsync();
            dispatch(setTheme(value));
          }}
        />
      ))}
    </View>
  );
}
