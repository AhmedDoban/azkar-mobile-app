import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import useThemeColors from "@/hooks/useThemeColors";
import { cn } from "@/lib/utils";
import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useWindowDimensions, View } from "react-native";
import { normalize180 } from "../_data/qibla";
import Compass from "./Compass";

const ALIGNED_WITHIN = 5;

export default function QiblaView({
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

  const offset = heading === null ? null : normalize180(bearing - heading);
  const aligned = offset !== null && Math.abs(offset) <= ALIGNED_WITHIN;

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
    <View className="gap-6">
      <View className="gap-6 px-1">
        {city ? (
          <View className="flex-row items-center justify-center gap-1">
            <Icon name="location" size={12} tintColor={colors.gray} />
            <AppText
              className="shrink text-xs text-main-gray"
              numberOfLines={1}
            >
              {city}
            </AppText>
          </View>
        ) : null}

        <View className="items-center gap-1">
          <Icon name="kaaba" size={52} tintColor={colors.main} />
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
          <AppText
            className="text-xs text-main-gray"
            style={{ textAlign: "center" }}
          >
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
    </View>
  );
}
