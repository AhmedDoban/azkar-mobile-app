import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import { PAGE_MOSQUES } from "@/constants/mosques";
import useThemeColors from "@/hooks/useThemeColors";
import { Locale } from "@/i18n/config";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Linking, StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import useCityName from "./_components/useCityName";
import usePrayerLabels from "./_components/usePrayerLabels";
import usePrayerSchedule, { toMinutes } from "./_components/usePrayerSchedule";
import ArchWindow from "./_ui/ArchWindow";
import NextPrayerHeader from "./_ui/NextPrayerHeader";
import PrayerCell from "./_ui/PrayerCell";
import PrayerTimesCardSkeleton from "./_ui/PrayerTimesCardSkeleton";

const DAY = 24 * 60;
const WINDOW = 0.26;
const DECOR = require("@/assets/images/NextPray_bg.webp");

const shortTime = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")}`;
};

export default function PrayerTimesCard() {
  const { t, i18n } = useTranslation(["prayer", "common"]);
  const locale = i18n.language as Locale;
  const colors = useThemeColors();
  const { label } = usePrayerLabels();
  const { day, prayers, next, now, isFriday, status, retry } =
    usePrayerSchedule();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const city = useCityName(day?.city);

  if (status === "loading") return <PrayerTimesCardSkeleton />;

  if (!day || !next) {
    const denied = status === "denied";
    return (
      <PressableScale
        onPress={denied ? () => Linking.openSettings() : retry}
        className="flex-row items-center justify-center gap-3 rounded-3xl border border-line bg-surface p-5"
      >
        <Icon
          name={denied ? "location" : "wifiOff"}
          size={16}
          tintColor={colors.orange}
        />
        <AppText className="shrink text-main-gray">
          {t(denied ? "locationNeeded" : "error")}
        </AppText>
        <AppText weight="bold" className="text-main">
          {t(denied ? "openSettings" : "common:retry")}
        </AppText>
      </PressableScale>
    );
  }

  const hijri = day.hijri;
  const comma = locale === "ar" ? "،" : ",";

  const current = now.getHours() * 60 + now.getMinutes();
  const passed = prayers.filter((p) => p.status === "passed");
  const previous = passed.length
    ? toMinutes(passed[passed.length - 1].time)
    : toMinutes(day.yesterdayIsha) - DAY;
  const target = current + next.minutesLeft;
  const progress = (current - previous) / Math.max(1, target - previous);

  const windowW = size.w * WINDOW;

  return (
    <View
      className="overflow-hidden rounded-[28px]"
      style={{ boxShadow: "0 10px 24px rgba(14, 58, 51, 0.25)" }}
      onLayout={(e) =>
        setSize({
          w: e.nativeEvent.layout.width,
          h: e.nativeEvent.layout.height,
        })
      }
    >
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="prayerCard" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={colors.brand.mid} />
            <Stop offset="1" stopColor={colors.brand.deep} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#prayerCard)" />
      </Svg>

      <Image
        source={DECOR}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, { width: "100%", height: "100%" }]}
      />

      {size.w > 0 ? (
        <View
          className="absolute bottom-0 end-3 top-3"
          style={{ width: windowW, pointerEvents: "none" }}
        >
          <ArchWindow
            source={PAGE_MOSQUES.prayerCard}
            width={windowW}
            height={size.h - 12 + 2}
          />
        </View>
      ) : null}

      <View className="gap-5 p-4">
        <View className="flex-row">
          <View className="flex-1 gap-4">
            <View className="flex-row items-center gap-1.5">
              <Icon name="calendar" size={13} tintColor="#ffffff" />
              <AppText
                className="shrink text-xs text-white"
                style={{ opacity: 0.85 }}
                numberOfLines={1}
              >
                {`${hijri.weekday[locale]}${comma} ${hijri.day} ${hijri.monthName[locale]} ${hijri.year}`}
              </AppText>
              {city ? (
                <>
                  <Icon name="location" size={12} tintColor="#ffffff" />
                  <AppText
                    className="shrink text-xs text-white"
                    style={{ opacity: 0.85 }}
                    numberOfLines={1}
                  >
                    {city}
                  </AppText>
                </>
              ) : null}
            </View>

            <NextPrayerHeader
              prayer={next.name}
              label={label(next.name, isFriday)}
              minutesLeft={next.minutesLeft}
              progress={progress}
            />
          </View>
          <View style={{ width: windowW }} />
        </View>

        <View className="flex-row">
          <View
            className="flex-1 flex-row rounded-3xl border p-1"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.16)",
            }}
          >
            {prayers.map(({ name, time, status }) => (
              <PrayerCell
                key={name}
                prayer={name}
                label={label(name, isFriday)}
                time={shortTime(time)}
                status={status}
              />
            ))}
          </View>
          <View style={{ width: windowW * 0.4 }} />
        </View>
      </View>
    </View>
  );
}
