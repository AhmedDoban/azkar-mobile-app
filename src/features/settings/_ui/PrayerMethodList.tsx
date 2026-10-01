import {
  PRAYER_METHODS,
  PrayerMethodSetting,
  resolveMethod,
} from "@/features/prayer-times/_data/methods";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import PrayerMethodOption from "./PrayerMethodOption";

const OPTIONS: PrayerMethodSetting[] = ["auto", ...PRAYER_METHODS];

export default function PrayerMethodList({
  value,
  onChange,
}: {
  value: PrayerMethodSetting;
  onChange: (value: PrayerMethodSetting) => void;
}) {
  const { t } = useTranslation("settings");

  return (
    <View accessibilityRole="radiogroup" className="gap-2">
      {OPTIONS.map((option) => (
        <PrayerMethodOption
          key={option}
          label={t(`methods.${option}`)}
          hint={
            option === "auto"
              ? t(`methods.${resolveMethod("auto")}`)
              : undefined
          }
          selected={option === value}
          onPress={() => {
            Haptics.selectionAsync();
            onChange(option);
          }}
        />
      ))}
    </View>
  );
}
