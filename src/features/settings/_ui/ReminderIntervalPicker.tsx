import AppText from "@/components/ui/AppText";
import { toArabicDigits } from "@/features/azkar/_data/quran";
import useThemeColors from "@/hooks/useThemeColors";
import {
  REMINDER_INTERVALS,
  ReminderInterval,
} from "@/store/Slices/SettingsSlice";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import SelectableCard from "./SelectableCard";

export default function ReminderIntervalPicker({
  value,
  onChange,
}: {
  value: ReminderInterval;
  onChange: (value: ReminderInterval) => void;
}) {
  const { t, i18n } = useTranslation("settings");
  const colors = useThemeColors();
  const digits = (n: number) =>
    i18n.language === "ar" ? toArabicDigits(n) : String(n);

  return (
    <View accessibilityRole="radiogroup" className="flex-row flex-wrap gap-2">
      {REMINDER_INTERVALS.map((hours) => {
        const label = t("reminders.every", { count: hours, n: digits(hours) });
        const selected = hours === value;
        return (
          <SelectableCard
            key={hours}
            label={label}
            selected={selected}
            className="rounded-full px-3.5 py-2"
            onPress={() => {
              if (selected) return;
              Haptics.selectionAsync();
              onChange(hours);
            }}
          >
            <AppText
              weight={selected ? "bold" : "regular"}
              className="text-sm"
              style={selected ? { color: colors.accent } : undefined}
            >
              {label}
            </AppText>
          </SelectableCard>
        );
      })}
    </View>
  );
}
