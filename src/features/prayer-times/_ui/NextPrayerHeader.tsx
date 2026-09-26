import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import useThemeColors from "@/hooks/useThemeColors";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { PRAYER_ICONS, PrayerName } from "../_data/types";

type Props = {
  prayer: PrayerName;
  label: string;
  time: string;
  remaining: string;
};

/** Next prayer on the hero card: icon and name at the start, time and countdown at the end */
export default function NextPrayerHeader({
  prayer,
  label,
  time,
  remaining,
}: Props) {
  const { t } = useTranslation("prayer");
  const colors = useThemeColors();

  return (
    <View className="flex-row items-center gap-3">
      <View className="size-12 items-center justify-center rounded-2xl bg-hero-blob">
        <Icon name={PRAYER_ICONS[prayer]} size={24} tintColor={colors.onHero} />
      </View>
      <View className="flex-1">
        <AppText className="text-xs text-on-hero-muted">{t("next")}</AppText>
        <AppText
          weight="bold"
          className="text-2xl leading-9 text-on-hero"
          numberOfLines={1}
        >
          {label}
        </AppText>
      </View>
      <View className="items-end gap-1">
        <AppText weight="bold" className="text-3xl leading-[42px] text-on-hero">
          {time}
        </AppText>
        <View className="flex-row items-center gap-1 rounded-full bg-hero-blob px-2.5 py-1">
          <Icon name="clock" size={11} tintColor={colors.onHero} />
          <AppText className="text-[11px] text-on-hero">{remaining}</AppText>
        </View>
      </View>
    </View>
  );
}
