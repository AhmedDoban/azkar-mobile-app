import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import useThemeColors from "@/hooks/useThemeColors";
import { Locale } from "@/i18n/config";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import usePrayerLabels from "./_components/usePrayerLabels";
import usePrayerSchedule from "./_components/usePrayerSchedule";
import NextPrayerHeader from "./_ui/NextPrayerHeader";
import PrayerCell from "./_ui/PrayerCell";
import PrayerTimesCardSkeleton from "./_ui/PrayerTimesCardSkeleton";
import PressableScale from "@/components/ui/PressableScale";

/**
 * Home hero card: the hijri date and city, the next prayer with its
 * countdown, and the day's prayers as a row of chips
 */
export default function PrayerTimesCard() {
  const { t, i18n } = useTranslation(["prayer", "common"]);
  const locale = i18n.language as Locale;
  const colors = useThemeColors();
  const { label, formatTime, formatRemaining } = usePrayerLabels();
  const { data, prayers, next, isFriday, isLoading, isError, refetch } =
    usePrayerSchedule();

  if (isLoading) return <PrayerTimesCardSkeleton />;

  if (isError || !data || !next) {
    return (
      <PressableScale
        onPress={refetch}
        className="flex-row items-center justify-center gap-3 rounded-3xl border border-line bg-surface p-5"
      >
        <Icon name="wifiOff" size={16} tintColor={colors.orange} />
        <AppText className="text-main-gray">{t("error")}</AppText>
        <AppText weight="bold" className="text-main">
          {t("common:retry")}
        </AppText>
      </PressableScale>
    );
  }

  const hijri = data.date.date_hijri;
  const comma = locale === "ar" ? "،" : ",";

  return (
    <View className="gap-5 overflow-hidden rounded-3xl border border-hero-border bg-hero p-5">
      {/* Decorative circles */}
      <View className="absolute -end-12 -top-14 size-44 rounded-full bg-hero-blob" />
      <View className="absolute -bottom-20 -start-10 size-40 rounded-full bg-hero-blob" />

      <View className="flex-row items-center gap-1.5">
        <Icon name="location" size={12} tintColor={colors.onHeroMuted} />
        <AppText className="shrink text-xs text-on-hero-muted" numberOfLines={1}>
          {`${hijri.weekday[locale]}${comma} ${hijri.day} ${hijri.month[locale]} ${hijri.year} · ${data.region}`}
        </AppText>
      </View>

      <NextPrayerHeader
        prayer={next.name}
        label={label(next.name, isFriday)}
        time={formatTime(next.time)}
        remaining={formatRemaining(next.minutesLeft)}
      />

      <View className="flex-row gap-1.5">
        {prayers.map(({ name, time, status }) => (
          <PrayerCell
            key={name}
            prayer={name}
            label={label(name, isFriday)}
            time={formatTime(time)}
            status={status}
          />
        ))}
      </View>
    </View>
  );
}
