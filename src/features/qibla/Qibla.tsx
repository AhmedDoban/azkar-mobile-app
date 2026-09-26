import AppText from "@/components/ui/AppText";
import Icon, { IconKey } from "@/components/ui/Icon";
import Screen from "@/components/ui/Screen";
import useThemeColors from "@/hooks/useThemeColors";
import { cn } from "@/lib/utils";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Linking,
  useWindowDimensions,
  View,
} from "react-native";
import useQibla from "./_components/useQibla";
import { normalize180 } from "./_data/qibla";
import Compass from "./_ui/Compass";
import KaabaIcon from "./_ui/KaabaIcon";
import PressableScale from "@/components/ui/PressableScale";

/** Within this many degrees of the qibla counts as facing it */
const ALIGNED_WITHIN = 5;

export default function Qibla() {
  const { t } = useTranslation(["common", "qibla"]);
  const {
    status,
    canAskAgain,
    city,
    heading,
    accuracy,
    bearing,
    distance,
    retry,
  } = useQibla();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen title={t("tabs.qibla")}>
        {status === "loading" ? (
          <Loading />
        ) : status === "denied" ? (
          <Message
            icon="location"
            title={t("qibla:permissionTitle")}
            hint={t("qibla:permissionHint")}
            action={t(canAskAgain ? "qibla:allow" : "qibla:openSettings")}
            onAction={canAskAgain ? retry : () => Linking.openSettings()}
          />
        ) : status === "error" || bearing === null || distance === null ? (
          <Message
            icon="wifiOff"
            title={t("qibla:error")}
            hint={t("qibla:errorHint")}
            action={t("common:retry")}
            onAction={retry}
          />
        ) : (
          <QiblaView
            city={city}
            heading={heading}
            accuracy={accuracy}
            bearing={bearing}
            distance={distance}
          />
        )}
      </Screen>
    </>
  );
}

function QiblaView({
  city,
  heading,
  accuracy,
  bearing,
  distance,
}: {
  city: string | null;
  heading: number | null;
  accuracy: number;
  bearing: number;
  distance: number;
}) {
  const { t } = useTranslation("qibla");
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const size = Math.min(width - 72, 300);

  // Positive = the qibla is to the right of where the phone points
  const offset = heading === null ? null : normalize180(bearing - heading);
  const aligned = offset !== null && Math.abs(offset) <= ALIGNED_WITHIN;

  // One tap of feedback each time the phone comes onto the qibla
  const wasAligned = useRef(false);
  useEffect(() => {
    if (aligned && !wasAligned.current) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    wasAligned.current = aligned;
  }, [aligned]);

  const deg = (value: number) => Math.round(Math.abs(value));
  const status =
    offset === null
      ? t("noCompass", { deg: deg(bearing) })
      : aligned
        ? t("facing")
        : t(offset > 0 ? "turnRight" : "turnLeft", { deg: deg(offset) });

  return (
    <>
      <View className="gap-6 rounded-3xl bg-surface px-5 pb-8 pt-5">
        <View className="flex-row items-center justify-between gap-3">
          <AppText weight="bold" className="text-main">
            {t("direction")}
          </AppText>
          {city ? (
            <View className="shrink flex-row items-center gap-1">
              <Icon name="location" size={12} tintColor={colors.gray} />
              <AppText className="shrink text-xs text-main-gray" numberOfLines={1}>
                {city}
              </AppText>
            </View>
          ) : null}
        </View>

        {/* The Kaaba stays at the top: turn until the arrow points at it */}
        <View className="items-center gap-1">
          <KaabaIcon size={52} />
          <Compass
            size={size}
            heading={heading}
            bearing={bearing}
            aligned={aligned}
          />
        </View>

        <View className="items-center gap-1">
          <AppText
            weight="bold"
            className={cn("text-lg", aligned ? "text-main" : "text-ink")}
            style={{ textAlign: "center" }}
          >
            {status}
          </AppText>
          <AppText className="text-xs text-main-gray" style={{ textAlign: "center" }}>
            {`${t("fromNorth", { deg: deg(bearing) })} · ${t("km", {
              value: Math.round(distance).toLocaleString(),
            })}`}
          </AppText>
        </View>
      </View>

      <AppText
        className="px-6 text-xs text-main-gray"
        style={{ textAlign: "center" }}
      >
        {heading !== null && accuracy < 2 ? t("calibrate") : t("hint")}
      </AppText>
    </>
  );
}

function Loading() {
  const { t } = useTranslation("qibla");
  const colors = useThemeColors();

  return (
    <View className="items-center gap-3 py-24">
      <ActivityIndicator color={colors.main} />
      <AppText className="text-main-gray">{t("locating")}</AppText>
    </View>
  );
}

function Message({
  icon,
  title,
  hint,
  action,
  onAction,
}: {
  icon: IconKey;
  title: string;
  hint: string;
  action: string;
  onAction: () => void;
}) {
  const colors = useThemeColors();

  return (
    <View className="items-center gap-3 px-6 py-16">
      <View className="size-16 items-center justify-center rounded-full bg-main-soft">
        <Icon name={icon} size={28} tintColor={colors.main} />
      </View>
      <AppText weight="bold" className="text-lg" style={{ textAlign: "center" }}>
        {title}
      </AppText>
      <AppText className="text-main-gray" style={{ textAlign: "center" }}>
        {hint}
      </AppText>
      <PressableScale
        onPress={onAction}
        className="mt-2 rounded-full bg-main-fill px-6 py-3"
      >
        <AppText weight="bold" className="text-on-fill">
          {action}
        </AppText>
      </PressableScale>
    </View>
  );
}
