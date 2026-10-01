import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { PRAYER_ICONS, PrayerName } from "../_data/types";
import PrayerCountdown from "./PrayerCountdown";

type Props = {
  prayer: PrayerName;
  label: string;
  minutesLeft: number;
  progress: number;
};

export default function NextPrayerHeader({
  prayer,
  label,
  minutesLeft,
  progress,
}: Props) {
  const { t } = useTranslation("prayer");
  const hours = Math.floor(minutesLeft / 60);
  const minutes = minutesLeft % 60;

  return (
    <View className="flex-row items-center gap-2.5">
      <PrayerCountdown hours={hours} minutes={minutes} progress={progress} />

      <View className="h-12 w-px bg-white" style={{ opacity: 0.2 }} />

      <View
        className="size-11 items-center justify-center rounded-2xl"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
      >
        <Icon name={PRAYER_ICONS[prayer]} size={22} tintColor="#ffffff" />
      </View>

      <View className="flex-1">
        <AppText
          className="text-xs text-white"
          style={{ opacity: 0.75 }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {t("next")}
        </AppText>
        <AppText
          weight="bold"
          className="text-[26px] leading-[40px] text-white"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {label}
        </AppText>
      </View>
    </View>
  );
}
